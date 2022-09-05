import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { connect } from "react-redux";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

function BlockchainPaymentScreen({
  user,
  shippingAddress,
  paymentMethod,
  products,
  cart,
}) {
  const WALLET_ADDRESS = "0x917A2Eb08f1374608d8afe2Ddf32efb70144Fd75";
  console.log("Products________", products, "cart_______", cart);
  const location = useLocation();
  const { amount } = location.state;
  const [currentAccount, setCurrentAccount] = useState("");
  const [etheriumPrice, setEtheriumPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const { ethereum } = window;

  const convertToEtherium = async () => {
    const { data } = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&ids=ethereum"
    );
    setEtheriumPrice((amount / data[0].current_price).toFixed(6));
  };

  console.log("", etheriumPrice);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    console.log("_______________");
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      //window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          transaction => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log("Etherium contract: ", provider, signer, transactionsContract);
    return transactionsContract;
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(etheriumPrice + "");

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: WALLET_ADDRESS,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          WALLET_ADDRESS,
          parsedAmount,
          "",
          ""
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();

        const orderData = {
          customerId: user,
          shippingAddress: "62fa6b86639e00a70eed3910",
          paymentMethod,
          amount: etheriumPrice,
          contractAddress: transactionHash.hash,
        };

        console.log("Products", products);

        const promise = products.map(async product => {
          const { data } = await Axios.post("/api/orders/create", {
            ...orderData,
            ...product,
          });
          console.log("Data", data);
        });
        console.log("PRomises", promise);
        Promise.all(promise);

        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        //window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    convertToEtherium();
    checkIfWalletIsConnect();
  }, []);

  useEffect(() => {
    if (!currentAccount) {
      console.log("Connecting Wallet");
      connectWallet();
    } else if (currentAccount && etheriumPrice > 0) {
      console.log("Sending transaction");
      sendTransaction();
    }
  }, [currentAccount, etheriumPrice]);

  console.log("Current Account: ", currentAccount);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      Sending Etherium
    </div>
  );
}

const mapStateToProps = state => {
  const products = state.cart.cart.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    sellerId: item.product.seller,
    storeId: item.product.store,
  }));
  return {
    seller: state.seller,
    user: state.user.user._id,
    shippingAddress: state.cart.shipping,
    paymentMethod: state.cart.payment,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps)(BlockchainPaymentScreen);
