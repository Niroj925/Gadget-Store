
// const TeamLayout = Loadable(
//     lazy(() => import("../layout/team-layout/TeamLayout"))
//   );

import Category from "../components/category/Category";
import Product from "../components/product/Product";
import Products from "../components/products/Products";
import PurchaseItem from "../components/purchaseItem/PurchaseItem";
import Home from "../pages/home/Home";

  
  const MainRoutes = {
    path: "/", 
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
      }
    ],

}

export default MainRoutes;