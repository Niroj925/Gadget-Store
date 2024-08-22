
import DashboardLayout from "../layout/DashboardLayout";
import AddCategory from "../pages/dashboard/category/AddCategory";
import AllCatgory from "../pages/dashboard/category/AllCatgory";
import AddProduct from "../pages/dashboard/product/AddProduct";
import AllProduct from "../pages/dashboard/product/AllProduct";


const DashboardRoutes = {
    path: "/dashboard",
    element: <DashboardLayout />,
  
    children: [
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "all-product",
        element: <AllProduct />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "all-categories",
        element: < AllCatgory/>,
      },
      {
        path: "register",
        // element: <AuthRegister />
      },
    ]
}

export default DashboardRoutes;