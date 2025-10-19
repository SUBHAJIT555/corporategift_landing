import { Outlet, ScrollRestoration } from "react-router";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <MobileMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
