import { motion } from "framer-motion";

const Why = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div>
      <div className="w-full px-4 sm:px-5 md:px-15 pb-8 sm:pb-10 md:pb-15">
        <div className="w-full py-8 sm:py-10 md:py-20 px-4 sm:px-5 md:px-15">
          {/* heading section start */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Left side */}
            <motion.div
              className="flex flex-col lg:col-span-2"
              variants={itemVariants}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-text-primary mb-4 sm:mb-6">
                Why Choose Us for Corporate Gifts?
              </h2>
            </motion.div>

            {/* Right side */}
            <motion.div className="flex lg:col-span-1" variants={itemVariants}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins text-text-primary leading-relaxed">
                Experience excellence in corporate gifting with our premium
                customized products, exceptional service, and innovative
                solutions that help strengthen your business relationships and
                enhance your brand presence.
              </p>
            </motion.div>
          </motion.div>

          {/* bento grid items start */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* ------------------------------ 1st item start ------------------------------ */}
            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-lg md:col-span-2 lg:col-span-1"
              variants={cardVariants}
            >
              <div className="flex flex-col h-full justify-between gap-3 sm:gap-4">
                <div className="rounded-lg p-3 sm:p-4 border transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]">
                  <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                    Premium Quality
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary">
                    We source only the finest materials and work with skilled
                    craftsmen to create corporate gifts of exceptional quality.
                  </p>
                </div>

                <div className="rounded-lg p-3 sm:p-4 border transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]">
                  <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                    Innovation
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary">
                    Our creative team stays ahead of trends to offer unique and
                    innovative gift solutions that make a lasting impression.
                  </p>
                </div>

                <div className="rounded-lg p-3 sm:p-4 border transition-all duration-300 h-auto sm:h-[calc(40vh/3)] md:h-[calc(45vh/3)] lg:h-[calc(50vh/3)]">
                  <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                    Reliability
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary">
                    Count on us for timely delivery and consistent quality
                    across all your corporate gifting needs.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* ------------------------------ 1st item end ------------------------------ */}
            {/* ------------------------------ 2nd item start ------------------------------ */}

            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-lg p-4 sm:p-6 border transition-all duration-300 md:col-span-2 lg:col-span-1"
              variants={cardVariants}
            >
              <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                Customization
              </h3>
              <p className="text-sm sm:text-base text-text-primary">
                We offer extensive customization options to perfectly align your
                corporate gifts with your brand identity and specific
                requirements.
              </p>
            </motion.div>
            {/* ------------------------------ 2nd item end ------------------------------ */}

            {/* ------------------------------ 3rd item start ------------------------------ */}
            <motion.div
              className="h-auto sm:h-[40vh] md:h-[45vh] lg:h-[50vh] rounded-lg md:col-span-2 lg:col-span-1"
              variants={cardVariants}
            >
              <div className="flex flex-col h-full justify-between gap-3 sm:gap-4">
                <div className="rounded-lg p-3 sm:p-4 border transition-all duration-300 h-auto sm:h-[20vh] md:h-[22.5vh] lg:h-[25vh]">
                  <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                    Expert Support
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary">
                    Our dedicated team provides personalized guidance and
                    support throughout your corporate gifting journey.
                  </p>
                </div>

                <div className="rounded-lg p-3 sm:p-4 border transition-all duration-300 h-auto sm:h-[20vh] md:h-[22.5vh] lg:h-[25vh]">
                  <h3 className="text-xl sm:text-2xl font-light text-text-primary mb-2 sm:mb-4">
                    Global Reach
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary">
                    With our extensive network, we can handle corporate gift
                    requirements for businesses of any size, anywhere in Dubai.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* ------------------------------ 3rd item end ------------------------------ */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Why;
