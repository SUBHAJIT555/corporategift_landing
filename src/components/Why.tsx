import { motion } from "framer-motion";

const Why = () => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <div
        className="w-full px-3 sm:px-5 md:px-15 pb-6 sm:pb-10 md:pb-15"
        id="why_Choose_Us"
      >
        <div className="w-full py-6 sm:py-10 md:py-20 px-3 sm:px-5 md:px-15">
          {/* heading section start */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 motion-element"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Left side */}
            <motion.div
              className="flex flex-col lg:col-span-2"
              variants={fadeInUp}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-text-primary mb-3 sm:mb-4 md:mb-6">
                Why Choose Us for Corporate Gifts?
              </h2>
            </motion.div>

            {/* Right side */}
            <motion.div className="flex lg:col-span-1" variants={fadeInUp}>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-poppins text-text-primary leading-relaxed">
                Experience excellence in corporate gifting with our premium
                customized products, exceptional service, and innovative
                solutions that help strengthen your business relationships and
                enhance your brand presence.
              </p>
            </motion.div>
          </motion.div>

          {/* bento grid items start */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12 motion-element"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* ------------------------------ 1st item start ------------------------------ */}
            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-2xl md:col-span-2 lg:col-span-1 motion-element"
              variants={fadeInUp}
            >
              <div className="flex flex-col h-full justify-between gap-2 sm:gap-3 md:gap-4">
                <motion.div
                  className="rounded-2xl p-3 sm:p-4 bg-[#D6E1D0] transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]"
                  variants={fadeInUp}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-[#6B7A61] mb-2 sm:mb-3 md:mb-4">
                    Premium Quality
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg text-[#6B7A61]">
                    We craft premium corporate gifts using the finest materials
                    and expert artisans.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-2xl p-3 sm:p-4 bg-[#F2F0E1] transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]"
                  variants={fadeInUp}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-[#858168] mb-2 sm:mb-3 md:mb-4">
                    Innovation
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg text-[#858168]">
                    We combine traditional craftsmanship with modern design to
                    create unique and innovative corporate gifts.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-2xl p-3 sm:p-4 bg-[#F1E7DB] transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]"
                  variants={fadeInUp}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-[#756f49] mb-2 sm:mb-3 md:mb-4">
                    Reliability
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg text-[#756f49]">
                    Count on us for timely delivery and consistent quality
                    across all your corporate gifting needs.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            {/* ------------------------------ 1st item end ------------------------------ */}
            {/* ------------------------------ 2nd item start ------------------------------ */}

            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-2xl p-3 sm:p-4 md:p-6 transition-all duration-300 md:col-span-2 lg:col-span-1 relative overflow-hidden motion-element"
              variants={fadeInUp}
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg"
                  alt="Customization background"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <motion.h3
                  className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary mb-2 sm:mb-3 md:mb-4"
                  variants={fadeInUp}
                >
                  Customization
                </motion.h3>
                <motion.p
                  className="text-sm xs:text-base sm:text-lg md:text-xl font-poppins font-semibold text-text-secondary bg-black/30 p-3 sm:p-4 rounded-2xl backdrop-blur-sm"
                  variants={fadeInUp}
                >
                  We offer extensive customization options to perfectly align
                  your corporate gifts with your brand identity and specific
                  requirements.
                </motion.p>
              </div>
            </motion.div>
            {/* ------------------------------ 2nd item end ------------------------------ */}

            {/* ------------------------------ 3rd item start ------------------------------ */}
            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-2xl md:col-span-2 lg:col-span-1 motion-element"
              variants={fadeInUp}
            >
              <div className="flex flex-col h-full justify-between gap-2 sm:gap-3 md:gap-4">
                <div className="rounded-2xl p-3 sm:p-4 transition-all duration-300 h-auto sm:h-[20vh] md:h-[22.5vh] lg:h-[25vh] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                      alt="Expert Support background"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <motion.h3
                      className="text-sm xs:text-base sm:text-lg md:text-xl font-light text-text-secondary mb-2 sm:mb-3 md:mb-4 bg-black/30 px-2 rounded-md backdrop-blur-sm w-fit"
                      variants={fadeInUp}
                    >
                      Eco-System
                    </motion.h3>
                    <motion.p
                      className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-text-primary"
                      variants={fadeInUp}
                    >
                      Expert Support
                      <br /> & Instant Action
                    </motion.p>
                  </div>
                </div>

                <div className="rounded-2xl p-3 sm:p-4 transition-all duration-300 h-auto sm:h-[20vh] md:h-[22.5vh] lg:h-[25vh] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                      alt="Global Reach background"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <motion.h3
                      className="text-sm xs:text-base sm:text-lg md:text-xl font-light text-text-secondary mb-2 sm:mb-3 md:mb-4 bg-black/30 px-2 rounded-md backdrop-blur-sm w-fit"
                      variants={fadeInUp}
                    >
                      Global Reach
                    </motion.h3>
                    <motion.p
                      className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-text-primary"
                      variants={fadeInUp}
                    >
                      Global Reach
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* ------------------------------ 3rd item end ------------------------------ */}

            {/* ------------------------------ 4th item start (Video Card) ------------------------------ */}
            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-2xl bg-[#BAC7B5] md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row overflow-hidden motion-element"
              variants={fadeInUp}
            >
              {/* Image div */}
              <div className="w-full sm:w-1/3 h-full p-3 sm:p-4">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Corporate Gifting"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Content div */}
              <div className="w-full sm:w-2/3 p-4 sm:p-6 md:p-10 flex flex-col justify-between items-start gap-3 sm:gap-4">
                <motion.h3
                  className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-light text-[#6B7A61]"
                  variants={fadeInUp}
                >
                  Make Everyday <br /> Sustainable, Beautiful, <br /> and Simple
                </motion.h3>
                <motion.p
                  className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-poppins text-[#6B7A61]"
                  variants={fadeInUp}
                >
                  From concept to delivery, we ensure a seamless experience. Our
                  team works closely with you to understand your requirements,
                  develop custom solutions, and deliver exceptional corporate
                  gifts that make a lasting impression.
                </motion.p>
                <motion.button
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-[#6B7A61] hover:bg-[#5a6652] transition-colors duration-300 text-white rounded-lg text-sm sm:text-base md:text-lg font-poppins w-fit cursor-pointer"
                  variants={fadeInUp}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
            {/* ------------------------------ 4th item end ------------------------------ */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Why;
