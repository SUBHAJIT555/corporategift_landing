import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Animated Background with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y,
          opacity,
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-18 pb-20">
        {/* Left Section - Main Content */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl text-white w-full">
            {/* Main Title */}
            <motion.div className="mb-6 sm:mb-7 md:mb-8" variants={fadeInUp}>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2">
                Premium Corporate Gifts in Dubai
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-7 md:mb-8 text-white/90 leading-relaxed"
              variants={fadeInUp}
            >
              Make Every Gift Count with{" "}
              <strong className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Baharnani.
              </strong>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Exclusive, high-quality, and customizable corporate gifts that
              impress clients, delight employees, and elevate your brand image.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8"
              variants={fadeInUp}
            >
              {/* WhatsApp CTA Button */}
              <motion.button
                className="w-full sm:w-auto bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 text-left cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <IoLogoWhatsapp className="text-xl sm:text-2xl text-green-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white">
                    Chat with us on WhatsApp for instant support & quote!
                  </span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Quote Form */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center px-4 md:px-8 lg:px-12 xl:px-16"
          variants={slideInRight}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md">
            <motion.div
              className="bg-gray-800/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-white"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                GET YOUR FREE QUOTE
              </motion.h2>

              <motion.form
                className="space-y-4 sm:space-y-5 md:space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp}>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your company name"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Contact Person*
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your full name"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="+971 50 000 0000"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="your@company.com"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 sm:py-4 rounded-xl sm:rounded-full transition-colors text-sm sm:text-base"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GET FREE QUOTE
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Trust Text */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center px-4 mt-10 w-full"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ">
          Over 200+ Companies Trust Baharnani for Corporate Gifts in UAE
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
