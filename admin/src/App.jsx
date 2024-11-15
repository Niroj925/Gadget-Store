import {  RouterProvider } from "react-router-dom"

import router from "./routes";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";

function App() {
  return (
  <>
   <ToastContainer />
   <ReactQueryDevtools initialIsOpen={false} />
   <RouterProvider router={router} />
  </>
  )
}
export default App
