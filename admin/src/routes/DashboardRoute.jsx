import DashboardLayout from "../layout/DashboardLayout";
import AddProduct from "../pages/dashboard/product/AddProduct";
import Category from "../pages/dashboard/product/Category";


const DashboardRoutes = {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "product",
        element: <AddProduct />,
      },
      {
        path: "category",
        element: <Category />
      },
    ]
}

export default DashboardRoutes;