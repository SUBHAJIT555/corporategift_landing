import { Outlet, ScrollRestoration } from "react-router";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { LenisProvider } from "../contexts/LenisProvider";

const MainLayout = () => {
  return (

    <div className="min-h-screen">
      <Header />
      <MobileMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>

  );
};

export default MainLayout;
