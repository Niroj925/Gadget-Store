import { createBrowserRouter } from "react-router-dom";
import { ErrorRoutes } from "./ErrorRoute";
import MainRoutes from "./mainRoute";
import DashboardRoutes from "./DashboardRoute";

const router = createBrowserRouter([
    MainRoutes,
    DashboardRoutes,
    ErrorRoutes
    ]);
export default router;
