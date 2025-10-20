import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCalendar } from "react-icons/io5";
import { createPortal } from "react-dom";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    callbackTime: "04/10/2025 01:30 PM",
    enquiryFor: "Online Courses (Website)",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: isMobile ? "1rem" : "2rem",
            }}
          >
            <motion.div
              className="bg-background rounded-lg w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                margin: isMobile ? "1rem" : "2rem",
                maxWidth: isMobile ? "calc(100vw - 2rem)" : "28rem",
                width: isMobile ? "auto" : "28rem",
              }}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-poppins">
                    Request a callback
                  </h2>
                  <motion.button
                    className="text-text-primary hover:text-primary transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IoClose className="w-6 h-6" />
                  </motion.button>
                </div>
                <p className="text-text-primary text-sm">
                  Fill the form below to request a callback from our team.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4"
              >
                {/* Name Field */}
                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="px-2 sm:px-3 py-2 sm:py-3 bg-text-primary/20 border border-gray-600 rounded-l-lg text-text-primary focus:outline-none focus:border-primary transition-colors text-sm sm:text-base">
                      <option value="+971"> +971</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-text-primary/20 border border-gray-600 border-l-0 rounded-r-lg text-text-primary placeholder-gray-400 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                      maxLength={9}
                      pattern="[0-9]{1,9}"
                      required
                    />
                  </div>
                </div>

                {/* Callback Time Field */}
                <div>
                  <label className="flex items-center gap-2 text-text-primary text-sm font-medium mb-2">
                    <span>When should we call you?</span>
                    <IoCalendar className="w-4 h-4" />
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="callbackTime"
                      value={formData.callbackTime}
                      onChange={handleInputChange}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors [color-scheme:text-primary] text-sm sm:text-base"
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        minHeight: isMobile ? "44px" : "auto",
                        lineHeight: "1.2",
                        textOverflow: isMobile ? "ellipsis" : "initial",
                        whiteSpace: isMobile ? "nowrap" : "normal",
                        overflow: isMobile ? "hidden" : "visible",
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                      }}
                      onFocus={(e) => {
                        // Prevent zoom on iOS
                        if (isMobile) {
                          e.target.style.fontSize = "16px";
                        }
                      }}
                      onBlur={(e) => {
                        if (isMobile) {
                          e.target.style.fontSize = "14px";
                        }
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Enquiry For Field */}
                <div>
                  <label className="flex items-center gap-2 text-text-primary text-sm font-medium mb-2">
                    <span>Enquiry For</span>
                  </label>
                  <select
                    name="enquiryFor"
                    value={formData.enquiryFor}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer text-sm sm:text-base"
                    required
                  >
                    <option value="Corporate Gifts">Corporate Gifts</option>
                    <option value="Customized Merchandise">Customized Merchandise</option>
                    <option value="Bulk Orders">Bulk Orders</option>
                    <option value="Gift Consultation">Gift Consultation</option>
                    <option value="Special Events">Special Events</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-text-secondary font-bold font-poppins py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-primary/80 transition-colors text-lg sm:text-xl cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CallbackModal;
