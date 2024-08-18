import { createBrowserRouter } from "react-router-dom";
import { ErrorRoutes } from "./ErrorRoute";
import DashboardRoutes from "./DashboardRoute";
import AuthRoutes from "./AuthRoute";

const router = createBrowserRouter([
    DashboardRoutes,
    AuthRoutes,
    ErrorRoutes
    ]);
export default router;
