
// const TeamLayout = Loadable(
//     lazy(() => import("../layout/team-layout/TeamLayout"))
//   );

import Cart from "../components/cart/Cart";
import Category from "../components/category/Category";
import Favourite from "../components/favourite/Favourite";
import Layout from "../components/layout/Layout";
import Success from "../components/orderInfo/Success";
import Product from "../components/product/Product";
import ProductReview from "../components/product/Review";
import Products from "../components/products/Products";
import PurchaseItem from "../components/purchaseItem/PurchaseItem";
import Home from "../pages/home/Home";
  
  const MainRoutes = {
    path: "", 
    element:<Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "category",
        element: <Category/>,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "purchase",
        element: <PurchaseItem />,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "favourite",
        element: <Favourite/>,
      },
      {
        path: "order/success",
        element: <Success/>,
      },
      {
        path: "product/review",
        element: <ProductReview/>,
      }
    ],

}

export default MainRoutes;