import DashboardLayout from "../components/layout/DashboardLayout";
import AddProduct from "../pages/dashboard/AddProduct";


const DashboardRoutes = {
    path: "/dashboard",
    element: <DashboardLayout />,
  
    children: [
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "register",
        // element: <AuthRegister />
      },
    ]
}

export default DashboardRoutes;