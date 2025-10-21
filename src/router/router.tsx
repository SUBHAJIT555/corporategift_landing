import { lazy } from "react";
import { createBrowserRouter } from "react-router";


const MainLayout = lazy(() => import("../layouts/Mainlayout"));
const Home = lazy(() => import("../pages/Home"));
const Quote = lazy(() => import("../pages/Quote"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "quote",
        element: <Quote />,
      },
    ],
  },
]);

export default router;
