import { RouterProvider } from "react-router";
import router from "./router/router";
import { Suspense } from "react";
import Loader from "./components/Loader";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>)
};

export default App;
