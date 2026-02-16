import { useState, useEffect, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Guarded window usage
  const toggleVisibility = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsVisible(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize once
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <Link
      to={`https://wa.me/+971526240517`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer
        bottom-20 right-4 p-2
        sm:bottom-24 sm:right-6 sm:p-3
        lg:bottom-28 lg:right-8 lg:p-4
        ${isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-2 pointer-events-none"
        }`}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
    </Link>
  );
};

export default WhatsAppButton;
