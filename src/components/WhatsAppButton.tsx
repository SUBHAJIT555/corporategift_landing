import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Open WhatsApp chat
  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number (include country code without +)
    const phoneNumber = "+971526240517"; // Example: "1234567890" for US number
    const message = "Hello! I'm interested in your corporate gifts services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={openWhatsApp}
      className={`fixed z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2  cursor-pointer
        // Mobile: smaller size, positioned above scroll to top
        bottom-20 right-4 p-2
        // Tablet: medium size, moderate spacing
        sm:bottom-24 sm:right-6 sm:p-3
        // Desktop: larger size, more spacing
        lg:bottom-28 lg:right-8 lg:p-4
        ${isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-2 pointer-events-none"
        }`}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
    </button>
  );
};

export default WhatsAppButton;
