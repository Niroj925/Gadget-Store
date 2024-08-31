
import DashboardLayout from "../layout/DashboardLayout";
import AddCategory from "../pages/dashboard/category/AddCategory";
import AllCatgory from "../pages/dashboard/category/AllCatgory";
import Category from "../pages/dashboard/category/Category";
import EditCategory from "../pages/dashboard/category/EditCategory";
import Dashboard from "../pages/dashboard/home/Dashboard";
import AllOrders from "../pages/dashboard/order/Order";
import AddProduct from "../pages/dashboard/product/AddProduct";
import AllProduct from "../pages/dashboard/product/AllProduct";
import EditProduct from "../pages/dashboard/product/EditProduct";
import Product from "../pages/dashboard/product/Product";


const DashboardRoutes = {
    path: "/dashboard",
    element: <DashboardLayout />,
  
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "all-product",
        element: <AllProduct />,
      },
      {
        path: "product",
        element: <Product/>,
      },
      {
        path: "edit-product",
        element: <EditProduct />,
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
        path: "category",
        element: < Category/>,
      },
      {
        path: "edit-categories",
        element: < EditCategory/>,
      },
      {
        path: "orders",
        element: < AllOrders/>,
      },
      {
        path: "register",
        // element: <AuthRegister />
      },
    ]
}

export default DashboardRoutes;