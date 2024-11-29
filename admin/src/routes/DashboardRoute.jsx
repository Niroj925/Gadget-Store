
import DashboardLayout from "../layout/DashboardLayout";
import AddCategory from "../pages/dashboard/category/AddCategory";
import AllCatgory from "../pages/dashboard/category/AllCatgory";
import Category from "../pages/dashboard/category/Category";
import CategoryProduct from "../pages/dashboard/category/CategoryProduct";
import EditCategory from "../pages/dashboard/category/EditCategory";
import Customers from "../pages/dashboard/customer/Customers";
import Dashboard from "../pages/dashboard/home/Dashboard";
import AllOrders from "../pages/dashboard/order/AllOrder";
import Order from "../pages/dashboard/order/Order";
import AddProduct from "../pages/dashboard/product/AddProduct";
import AllProduct from "../pages/dashboard/product/AllProduct";
import EditProduct from "../pages/dashboard/product/EditProduct";
import Product from "../pages/dashboard/product/Product";
import Products from "../pages/dashboard/product/Products";
import Shipping from "../pages/dashboard/shipping/shipping";
import AddStaff from "../pages/dashboard/staff/AddStaff";
import EditStaff from "../pages/dashboard/staff/EditStaff";
import Staff from "../pages/dashboard/staff/Staff";
import ProtectedAdminRoute from "./ProtectedAdminRoute";


const DashboardRoutes = {
    path: "/dashboard",
    element: <DashboardLayout />,
  
    children: [
      {
        path: "",
        element: (
          <ProtectedAdminRoute>
            <Dashboard/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "add-product",
        element:(
          <ProtectedAdminRoute>
             <AddProduct />
          </ProtectedAdminRoute>
        ),
        
      },
      {
        path: "all-product",
        element:(
          <ProtectedAdminRoute>
             <AllProduct />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "product",
        element:(
          <ProtectedAdminRoute>
            <Product/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "products",
        element:(
          <ProtectedAdminRoute>
            <Products/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "edit-product",
        element:(
          <ProtectedAdminRoute>
            <EditProduct />
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "add-category",
        element:(
          <ProtectedAdminRoute>
            <AddCategory />
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "all-categories",
        element:(
          <ProtectedAdminRoute>
            < AllCatgory/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "category",
        element:(
          <ProtectedAdminRoute>
             < Category/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "category-product",
        element:(
          <ProtectedAdminRoute>
            < CategoryProduct/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "edit-categories",
        element:(
          <ProtectedAdminRoute>
            < EditCategory/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "orders",
        element:(
          <ProtectedAdminRoute>
            < AllOrders/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "order-info",
        element:(
          <ProtectedAdminRoute>
             < Order/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "shipping",
        element:(
          <ProtectedAdminRoute>
             <Shipping/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "staff",
        element:(
          <ProtectedAdminRoute>
             <Staff/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "add-staff",
        element:(
          <ProtectedAdminRoute>
             <AddStaff/>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "edit-staff",
        element:(
          <ProtectedAdminRoute>
            <EditStaff/>
          </ProtectedAdminRoute>
        ), 
      },
      {
        path: "customers",
        element:(
          <ProtectedAdminRoute>
            <Customers/>
          </ProtectedAdminRoute>
        ), 
      },

      // {
      //   path: "register",
      //    element:(
      //     <ProtectedAdminRoute>
      //     <AuthRegister />
      //     </ProtectedAdminRoute>
      //   ), 
      // },
    ]
}

export default DashboardRoutes;