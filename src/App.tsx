import { RouterProvider } from "react-router";
import router from "./router/router";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import Loader from "./components/Loader";
import { swrConfig } from "./lib/swrConfig";


const App = () => {
  return (
    <SWRConfig value={swrConfig}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </SWRConfig>
  );
};

export default App;


