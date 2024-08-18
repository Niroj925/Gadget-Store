
import ErrorLayout from "../components/layout/Error";
import NotFound from "../pages/error/NotFound";
import ServerError from "../pages/error/ServerError";

export const ErrorRoutes = {
  path: "/error",
  element: <ErrorLayout />,
  children: [
    {
      path: "serverError",
      element: <ServerError />,
    },
    {
      path: "notFoundError",
      element: <NotFound />,
    },
  ],
};
