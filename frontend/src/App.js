import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./Screens/ProductDetails";
import Login from "./Screens/Login";
import Registeration from "./Screens/Registeration";
import CartScreen from "./Screens/CartScreen";
import StoreScreen from "./Screens/StoreScreen";
import WorkerScreen from "./Screens/WorkerScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import StoreDetail from "./Screens/StoreDetail";
import WorkerDetails from "./Screens/WorkerDetails";
import Shipping from "./Screens/Shipping";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import OrderDetails from "./Screens/OrderDetails";
import { connect } from "react-redux";
import AdminDashboard from "./Screens/AdminDashboard";

function App({ model }) {
  console.log("Model******", model);
  return (
    <div className={`relative min-h-[100vh] py-16`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="registeration" element={<Registeration />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="stores" element={<StoreScreen />} />
          <Route path="stores/:storeId/*" element={<StoreDetail />} />
          <Route path="workers" element={<WorkerScreen />} />
          <Route path="workers/:workerId" element={<WorkerDetails />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="paymentMethod" element={<PaymentMethodScreen />} />
          <Route path="orderDetails" element={<OrderDetails />} />
          <Route path="profile/:userId/*" element={<ProfileScreen />} />
          <Route path="AdminDashboard/*" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    model: state.model.modelOpen,
  };
};

export default connect(mapStateToProps, null)(App);
