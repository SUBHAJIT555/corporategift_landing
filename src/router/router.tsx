import { lazy } from "react";
import { createBrowserRouter } from "react-router";


const MainLayout = lazy(() => import("../layouts/Mainlayout"));
const Home = lazy(() => import("../pages/Home"));
const Quote = lazy(() => import("../pages/Quote"));
const ThankYou = lazy(() => import("../components/ThankYou"));

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
      {
        path: "thank-you",
        element: <ThankYou />,
      },
    ],
  },
]);

export default router;
