import AddProduct from "../../../client/src/pages/dashboard/AddProduct";
import DashboardLayout from "../layout/DashboardLayout";



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