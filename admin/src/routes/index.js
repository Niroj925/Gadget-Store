import { createBrowserRouter } from "react-router-dom";
import { ErrorRoutes } from "./ErrorRoute";
import DashboardRoutes from "./DashboardRoute";
import AuthRoutes from "./AuthRoute";
import DeliveryRoutes from "./DeliveryRoute";

const router = createBrowserRouter([
    DashboardRoutes,
    AuthRoutes,
    DeliveryRoutes,
    ErrorRoutes
    ]);
export default router;
