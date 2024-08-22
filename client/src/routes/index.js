import { createBrowserRouter } from "react-router-dom";
import { ErrorRoutes } from "./ErrorRoute";
import MainRoutes from "./mainRoute";   

const router = createBrowserRouter([
    MainRoutes,
    ErrorRoutes
    ]);
export default router;
