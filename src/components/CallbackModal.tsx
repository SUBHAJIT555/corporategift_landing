import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCalendar } from "react-icons/io5";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

// 🔹 Validation schema
const callbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^\+971\s?\d{9}$/, "Please enter a valid UAE number"),
  callbackTime: z.string().nonempty("Please select a callback time"),
  enquiryFor: z.string().nonempty("Please select an enquiry type"),
});

type CallbackFormData = z.infer<typeof callbackSchema>;

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      name: "",
      phone: "",
      callbackTime: "",
      enquiryFor: "",
    },
  });

  const [_, setIsMobile] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onSubmit = async (data: CallbackFormData) => {
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch(
        "https://corporategiftsdubaii.ae/wp-json/fluentform/v1/callback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form_id: 4,
            data: {
              name: data.name,
              phone: data.phone,
              call_back_time: data.callbackTime,
              enquiry_for: data.enquiryFor,
            },
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Submission failed");

      navigate("/thank-you");
      setStatus("success");
      setMessage("✅ Callback request sent successfully!");
      reset();

      setTimeout(() => {
        onClose();
        setStatus("idle");
        setMessage("");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setMessage(`❌ ${err instanceof Error ? err.message : "Unknown error"}`);
    }
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
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-background rounded-lg w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-text-primary text-lg sm:text-xl font-bold">
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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-3 py-2 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}

                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        let val = e.target.value;

                        // Allow backspace down to empty string
                        if (val === "") {
                          e.target.value = "";
                          return;
                        }

                        // Only digits and one leading +
                        val = val.replace(/[^\d+]/g, "");

                        // Auto-add +971 if missing and user starts typing a digit
                        if (!val.startsWith("+971")) {
                          if (val.startsWith("+97")) {
                            val = "+971";
                          } else if (val.startsWith("+9") || val.startsWith("9")) {
                            val = "+971";
                          } else if (val.startsWith("0")) {
                            val = "+971" + val.slice(1);
                          } else if (!val.startsWith("+")) {
                            val = "+971" + val;
                          }
                        }

                        // Trim to +971 + 9 digits max
                        if (val.length > 13) val = val.slice(0, 13);

                        e.target.value = val;
                      },
                    })}
                    type="tel"
                    inputMode="numeric"
                    className="w-full px-3 py-2 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    placeholder="+971XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>




                {/* Callback Time */}
                <div>
                  <label className="flex items-center gap-2 text-text-primary text-sm font-medium mb-2">
                    <span>When should we call you?</span>
                    <IoCalendar className="w-4 h-4" />
                  </label>
                  <input
                    type="datetime-local"
                    {...register("callbackTime")}
                    className="w-full px-3 py-2 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {errors.callbackTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.callbackTime.message}
                    </p>
                  )}
                </div>

                {/* Enquiry For */}
                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Enquiry For
                  </label>
                  <select
                    {...register("enquiryFor")}
                    className="w-full px-3 py-2 bg-text-primary/20 border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Corporate Gifts">Corporate Gifts</option>
                    <option value="Customized Merchandise">Customized Merchandise</option>
                    <option value="Bulk Orders">Bulk Orders</option>
                    <option value="Gift Consultation">Gift Consultation</option>
                    <option value="Special Events">Special Events</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.enquiryFor && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.enquiryFor.message}
                    </p>
                  )}
                </div>

                {/* Status Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm font-medium ${status === "success" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-text-secondary font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
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
