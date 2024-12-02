
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";



const AuthRoutes = {
    path: "/",
  
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "reset-password",
        element: <ForgotPassword />
      },
      {
        path: "register",
        // element: <AuthRegister />
      },
    ]
}

export default AuthRoutes;