import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Home from "./pages/home/Home";
import Category from "./components/category/Category";
import Product from "./components/product/Product";
import PurchaseItem from "./components/purchaseItem/PurchaseItem";
import Map from "./components/map/Map";
import Products from "./components/products/Products";
import router from "./routes";

function App() {
  return (
  //   <BrowserRouter>  
  //   <Routes>
  //   <Route path="/" element={<Home/>} />
  //   <Route path="/category" element={<Category/>} />
  //   <Route path="/products" element={<Products/>} />
  //   <Route path="/product" element={<Product/>} />
  //   <Route path="/purchase" element={<PurchaseItem/>} />
  //   <Route path="/map" element={<Map/>} />
  // </Routes>
  //   </BrowserRouter>
  <>
   <RouterProvider router={router} />
  </>
  )
}
export default App
