import {  RouterProvider } from "react-router-dom"
import router from "./routes";
// import useBookStore from "./store/store";
// import { useEffect } from "react";

function App() {
  // const reset = useBookStore((state) => state.reset);

  // useEffect(() => {
  //   reset();
  // }, [reset]);
  return (
  <>
   <RouterProvider router={router} />
  </>
  )
}
export default App
