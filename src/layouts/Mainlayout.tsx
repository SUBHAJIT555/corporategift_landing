import { Outlet, ScrollRestoration } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { LenisProvider } from "../contexts/LenisProvider";
import CallbackModal from "../components/CallbackModal";

const MainLayout = () => {
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);

  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasShownModal = sessionStorage.getItem("callbackModalShown");

    if (!hasShownModal) {
      // Open modal after 10 seconds (10000ms)
      const timer = setTimeout(() => {
        setIsAutoModalOpen(true);
        sessionStorage.setItem("callbackModalShown", "true");
      }, 30000);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LenisProvider>
      <div className="min-h-screen">
        <Header />
        <MobileMenu />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollRestoration />

        {/* Auto-open Callback Modal */}
        <CallbackModal
          isOpen={isAutoModalOpen}
          onClose={() => setIsAutoModalOpen(false)}
        />
      </div>
    </LenisProvider>
  );
};

export default MainLayout;
