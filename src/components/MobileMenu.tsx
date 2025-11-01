import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useMobileMenuStore } from "../store/mobileMenuStore";
import { IoClose } from "react-icons/io5";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaPhone,
} from "react-icons/fa";
import CallbackModal from "./CallbackModal";

const MobileMenu: React.FC = () => {
  const { isOpen, closeMenu } = useMobileMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigationItems = [
    { name: "About", path: "/#about" },
    { name: "Products", path: "/#products" },
    { name: "Services", path: "/#services" },
    { name: "Why Choose Us", path: "/#why_Choose_Us" },
    { name: "FAQ", path: "/#FAQ" },
    { name: "Contact", path: "/#contact" },
  ];

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-[999] mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 h-screen w-full md:w-80 bg-black/90 backdrop-blur-md border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-4 px-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8 ">
                  <motion.button
                    className="text-white p-2 hover:text-primary transition-colors cursor-pointer duration-200"
                    onClick={closeMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <IoClose className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block text-white text-lg font-bwgradual tracking-wide hover:text-primary transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Contact Button */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <motion.button
                    className="w-full  text-text-secondary px-6 py-3 font-bwgradual text-md tracking-wider transition-all duration-200 hover:text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      x: [0, -3, 3, -3, 3, 0],
                      transition: {
                        x: {
                          duration: 0.6,
                          delay: 1,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        },
                      },
                    }}
                    onClick={() => {
                      setIsModalOpen(true);
                      closeMenu();
                    }}
                  >
                    Request Callback
                  </motion.button>
                </motion.div>

                {/* Call, Email and Social Links */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <motion.a
                    href="tel:+971526240517"
                    className="mb-4 flex items-center gap-3 text-white hover:text-primary transition-colors duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="w-5 h-5" />
                    <span className="font-helvetica text-lg">
                      +971 52 624 0517
                    </span>
                  </motion.a>

                  <motion.a
                    href="mailto:amit@baharnani.com"
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEnvelope className="w-5 h-5" />
                    <span className="font-helvetica text-lg">
                      amit@baharnani.com
                    </span>
                  </motion.a>

                  <div className="mt-5 flex items-center gap-4">
                    <motion.a
                      href="https://www.instagram.com/baharnaniadv/"
                      className="w-11 h-11 flex items-center justify-center rounded-full text-white hover:text-primary transition-colors duration-200 border border-white/10"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/company/baharnaniadvertisingdubai/?originalSubdomain=ae"
                      className="w-11 h-11 flex items-center justify-center rounded-full text-white hover:text-primary transition-colors duration-200 border border-white/10"
                      whileTap={{ scale: 0.95 }}
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.facebook.com/BAHARNANIADV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full text-white hover:text-primary transition-colors duration-200 border border-white/10"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MobileMenu;
