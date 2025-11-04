import { motion, type Variants } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import HeroImage from "../assets/images/HeroImages/Hero-sec.webp";

// ✅ Validation Schema
const quoteSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  contact_person: z.string().min(2, "Contact person is required"),
  phone_number: z
    .string()
    .regex(/^\+971\s?\d{9}$/, "Please enter a valid UAE number"),
  email: z.string().email("Please enter a valid email address"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const HeroSection = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  // 🔹 Animations
  const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // ✅ Submit handler
  const onSubmit = async (data: QuoteFormData) => {
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch(
        "https://staging.corporategiftsdubaii.ae/wp-json/fluentform/v1/quote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form_id: 5,
            data: {
              contact_person: data.contact_person,
              company_name: data.company_name,
              phone_number: data.phone_number,
              email: data.email,
            },
          }),
        }
      );


      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Submission failed");

      navigate("/thank-you");
      setStatus("success");
      setMessage("✅ Quote submitted successfully!");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(`❌ ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${HeroImage})` }}
      />

      {/* Main Container */}
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center py-16 sm:py-20 md:py-24 lg:py-32 gap-8 lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Left Section */}
        {/*  */}
        <motion.div
          className="w-full lg:w-2/3 py-8 sm:py-12 md:py-16 lg:py-0 order-1 lg:order-1"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-3xl text-white " >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-4 sm:mb-6"
              variants={fadeIn}
            >
              Get Premium Corporate Gifts in Dubai & Abu Dhabi, UAE
            </motion.h1>

            <motion.div
              className="h-px w-12 sm:w-16 bg-text-secondary mb-4 sm:mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="text-xs sm:text-sm uppercase tracking-wide text-gray-200 mb-3 sm:mb-4"
              variants={fadeIn}
            >
              Trusted by 200+ UAE brands
            </motion.p>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8"
              variants={fadeIn}
            >
              At <strong className="text-white">Baharnani </strong>Corporate
              Gifts Dubai, we specialize in premium corporate gifts and
              promotional items that help your business make a statement across
              Dubai, Abu Dhabi, and the wider UAE.
            </motion.p>

            {/* <Link target="_blank" to={`https://wa.me/+971526240517?text=${encodeURIComponent("Hello! I'm interested in your corporate gifts services.")}`}> */}
            <motion.button
              onClick={() => {
                const phoneNumber = "+971526240517";
                const message = "Hello! I'm interested in your corporate gifts services.";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto justify-center cursor-pointer"
              variants={fadeIn}
            >
              <IoLogoWhatsapp className="text-lg sm:text-xl text-green-500" />
              <span>Get instant quote on WhatsApp</span>
            </motion.button>
            {/* </Link> */}
          </div>
        </motion.div>

        {/* Right Section - Quote Form */}

        <motion.div
          className="w-full lg:w-1/2  pb-8 sm:pb-12 md:pb-16 lg:pb-0 order-2 lg:order-2"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">
                Get Your Free Quote
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Company Name*
                  </label>
                  <input
                    {...register("company_name")}
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your company name"
                  />
                  {errors.company_name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Contact Person*
                  </label>
                  <input
                    {...register("contact_person")}
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your full name"
                  />
                  {errors.contact_person && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.contact_person.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Phone Number*
                  </label>
                  <input
                    {...register("phone_number", {
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
                          } else if (
                            val.startsWith("+9") ||
                            val.startsWith("9")
                          ) {
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
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="+971XXXXXXXXX"
                  />
                  {errors.phone_number && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Email Address*
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="your@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm font-medium ${status === "success" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-gray-900 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-bold cursor-pointer hover:bg-primary hover:text-text-secondary transition-all ease-in-out duration-300"
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? "Sending..." : "Get Free Quote"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
