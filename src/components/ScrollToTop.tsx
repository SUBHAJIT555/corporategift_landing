import { useState, useEffect, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLenisContext } from "../hooks/useLenis";
import WhatsAppButton from "./WhatsAppButton";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { lenis } = useLenisContext();

  // ✅ Wrap window access in guards
  const toggleVisibility = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsVisible(window.pageYOffset > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [lenis]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize visibility once on mount
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <>
      <WhatsAppButton />
      <button
        onClick={scrollToTop}
        className={`fixed z-50 bg-primary text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer
          bottom-4 right-4 p-2
          sm:bottom-6 sm:right-6 sm:p-3
          lg:bottom-8 lg:right-8 lg:p-4
          ${isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-2 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>
    </>
  );
};

export default ScrollToTop;
