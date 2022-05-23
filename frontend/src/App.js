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

function App() {
  return (
    <div className="relative min-h-[100vh] pb-16">
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
          <Route path="profile/:userId" element={<ProfileScreen />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
