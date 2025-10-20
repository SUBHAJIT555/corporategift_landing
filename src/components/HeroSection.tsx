import { motion, type Variants } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router";

const HeroSection = () => {
  // Simple, smooth animation variants
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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')] bg-cover bg-center opacity-20" />

      {/* Content Overlay */}
      {/* <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-18 pb-20"> */}
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-center pt-16 sm:pt-20 md:pt-24 lg:pt-0 gap-8 lg:gap-0">
        {/* Left Section - Main Content */}
        <motion.div
          className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-0 order-2 lg:order-1"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-3xl text-white">
            {/* Main Title */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-4 sm:mb-6"
              variants={fadeIn}
            >
              Premium Corporate Gifts in Dubai
            </motion.h1>

            {/* Minimal animated divider */}
            <motion.div
              className="h-px w-12 sm:w-16 bg-white/30 mb-4 sm:mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />

            {/* Meta line */}
            <motion.p
              className="text-xs sm:text-sm uppercase tracking-wide text-gray-400 mb-3 sm:mb-4"
              variants={fadeIn}
            >
              Trusted by 200+ UAE brands
            </motion.p>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8"
              variants={fadeIn}
            >
              Make every gift count with{" "}
              <span className="font-medium text-white">Baharnani</span>.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Exclusive, high-quality, and customizable corporate gifts that
              impress clients and elevate your brand.
            </motion.p>

            {/* WhatsApp CTA */}
            <Link target="_blank" to="https://wa.me/971500000000">
              <motion.button
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
                variants={fadeIn}
              >
                <IoLogoWhatsapp className="text-lg sm:text-xl text-green-500" />
                <span>Get instant quote on WhatsApp</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Section - Quote Form */}
        <motion.div
          className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-16 pb-8 sm:pb-12 md:pb-16 lg:pb-0 order-1 lg:order-2"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">
                Get Your Free Quote
              </h2>

              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Contact Person*
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="+971 50 000 0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg"
                    placeholder="your@company.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 font-medium py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
                >
                  Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
