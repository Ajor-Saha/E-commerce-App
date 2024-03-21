import Header from "./components/header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import MenProductPage from "./pages/MenProductPage";
import WomenProductPage from "./pages/WomenProductPage";
import KidsProductPage from "./pages/KidsProductPage";
import ShoppingList from "./pages/ShoppingList";
import Admin from "./pages/admin/Admin";
import AdminProduct from "./pages/admin/AdminProduct";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/footer/Footer";
import OnlyAdminPrivateRoute from "./components/admin/OnlyAdminPrivateRoute";
import AddProduct from "./pages/admin/AddProduct";
import AllProducts from "./pages/AllProducts";
import EditPage from "./pages/admin/EditPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import PrivateRoute from "./components/utils/PrivateRoute";
import AutoScroll from "./components/utils/AutoScroll";


function App() {
  

  return (
    <BrowserRouter>
    <AutoScroll />
    <Header />
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/products/:productName" element={<MenProductPage />} />
        <Route path="/products/women/:productName" element={<WomenProductPage />} />
        <Route path="/products/kids/:productName" element={<KidsProductPage />} /> 
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProduct />} />
        <Route path="/search" element={<AllProducts />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route element={<PrivateRoute /> }>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/edit/:productId" element={<EditPage />} />
        </Route>
      </Routes>     
      <Footer /> 
    </BrowserRouter>
   
  )
}

export default App


/*
<Header />
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/products/:productName" element={<MenProductPage />} />
        <Route path="/products/women/:productName" element={<WomenProductPage />} />
        <Route path="/products/kids/:productName" element={<KidsProductPage />} /> 
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route element={<PrivateRoute /> }>
          <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
 */