import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import { useMobileMenuStore } from "../store/mobileMenuStore";
import { IoMenu } from "react-icons/io5";
import CallbackModal from "./CallbackModal";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ✅ don't access window at init
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const { toggleMenu, isOpen } = useMobileMenuStore();
  const location = useLocation();

  // ✅ safe window usage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      setIsVisible(!(scrollTop > lastScrollY && scrollTop > 100));
      setLastScrollY(scrollTop);
    };

    const handleResize = () => setWindowWidth(window.innerWidth);

    // initialize
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  // ✅ fallback width for SSR render
  const width = windowWidth ?? 1024;

  const navigationItems = [
    { name: "About", path: "/#about" },
    { name: "Products", path: "/#products" },
    { name: "Services", path: "/#services" },
    { name: "Why Choose Us", path: "/#why_Choose_Us" },
    { name: "FAQ", path: "/#FAQ" },
    { name: "Contact", path: "/#contact" },
  ];

  const getVisibleNavigationItems = useCallback(() => {
    if (width >= 1280) return navigationItems;
    if (width >= 1024) return navigationItems.slice(0, 6);
    if (width >= 768) return navigationItems.slice(0, 5);
    return navigationItems;
  }, [width]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-black/40 backdrop-blur-sm border-b border-white border-dashed"
          : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ minHeight: width < 768 ? "60px" : "80px" }}
    >
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <Logo />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8">
            {getVisibleNavigationItems().map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white text-sm lg:text-base xl:text-lg font-bwgradual relative overflow-hidden h-5 md:h-6 flex items-center cursor-pointer"
              >
                <motion.div
                  className="relative"
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    initial: { y: 0 },
                    hover: { y: -24 },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className={`block ${isActive(item.path) ? "text-primary" : ""}`}>
                    {item.name}
                  </span>
                  <motion.span
                    className="block absolute top-5 md:top-6 text-yellow-500 font-bwgradual"
                    variants={{ initial: { y: 0 }, hover: { y: 0 } }}
                  >
                    {item.name}
                  </motion.span>
                </motion.div>
              </Link>
            ))}

            {/* Callback Button */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex text-white text-xs md:text-sm lg:text-base xl:text-lg font-medium font-poppins tracking-wide relative overflow-hidden h-5 md:h-6 items-center cursor-pointer px-2 md:px-3 lg:px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                x: [0, -12, 12, -12, 12, -6, 6, 0],
                transition: {
                  opacity: { duration: 0.4, delay: navigationItems.length * 0.1 + 0.1 },
                  y: { duration: 0.4, delay: navigationItems.length * 0.1 + 0.1 },
                  x: {
                    duration: 1.0,
                    delay: navigationItems.length * 0.1 + 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <motion.div
                className="relative"
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -24 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="block text-text-secondary font-bwgradual">
                  Request Callback
                </span>
                <motion.span
                  className="block absolute top-5 md:top-6 text-yellow-500"
                  variants={{ initial: { y: 0 }, hover: { y: 0 } }}
                >
                  Request_Callback
                </motion.span>
              </motion.div>
            </motion.button>
          </nav>

          {/* Mobile menu */}
          <motion.button
            className="md:hidden text-white p-1.5 sm:p-2 mobile-menu-button relative z-[70]"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            onClick={toggleMenu}
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <IoMenu className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
};

export default Header;
