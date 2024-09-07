
import Login from "../pages/auth/Login";



const AuthRoutes = {
    path: "/",
  
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        // element: <AuthRegister />
      },
    ]
}

export default AuthRoutes;