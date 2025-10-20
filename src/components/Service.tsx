import { motion } from "framer-motion";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router";
import CallbackModal from "./CallbackModal";

const webDevelopment =
  "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg";
const appDevelopment =
  "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg";
const interactiveGameDevelopment =
  "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg";
const uiuxDesign =
  "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg";
const twoDThreeD =
  "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";
const digitalMarketing =
  "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg";

const WhatCan = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full py-10 md:py-20" id="services">
      <div className="w-full px-5 md:px-15  pb-10 md:pb-15">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary tracking-tight text-text">
          We Offer You The Best Corporate Gifts{" "}
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary">
            {" "}
            in Dubai
          </span>
        </h3>

        <p className="text-lg md:text-xl lg:text-2xl font-grotesk text-text mt-5 max-w-7xl leading-relaxed">
          Discover our premium collection of corporate gifts designed to elevate
          your business relationships. From elegant{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            luxury gift sets
          </span>{" "}
          to sophisticated{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            branded merchandise
          </span>{" "}
          and exclusive{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            customized awards
          </span>
          , we create memorable gifting experiences. Our expertise includes
          crafting distinctive{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            promotional items
          </span>
          , elegant{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            corporate accessories
          </span>
          , and unique{" "}
          <span className="font-grotesk font-bold text-text/90 hover:text-text transition-colors">
            bespoke gift solutions
          </span>{" "}
          that reflect your brand's prestige. Partner with us to make lasting
          impressions through thoughtfully curated corporate gifts that speak
          volumes about your business values.
        </p>
      </div>
      <div className="px-5 md:px-15">
        <div className="cards w-full flex flex-col md:flex-row gap-5 md:gap-15 mt-5 md:mt-10">
          {/* container web development  */}

          {/* Luxury Gift Sets */}

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Luxury Gift Sets
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={webDevelopment}
                alt=""
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Premium gift sets designed to impress. Our collection includes
                elegant corporate merchandise, branded accessories, and
                exclusive awards that reflect your brand's prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Premium gift sets designed to impress. Our collection includes
              elegant corporate merchandise, branded accessories, and exclusive
              awards that reflect your brand's prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>

          {/* container Branded Merchandise */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Branded Merchandise
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={appDevelopment}
                alt=""
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Sophisticated branded merchandise that reflect your brand's
                prestige. Our collection includes elegant corporate accessories,
                and exclusive awards that reflect your brand's prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Sophisticated branded merchandise that reflect your brand's
              prestige. Our collection includes elegant corporate accessories,
              and exclusive awards that reflect your brand's prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 md:px-15">
        <div className="cards w-full flex flex-col md:flex-row gap-5 md:gap-15 mt-5 md:mt-10">
          {/* container Customized Awards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Customized Awards
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={interactiveGameDevelopment}
                alt=""
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Customized awards that reflect your brand's prestige. Our
                collection includes exclusive awards that reflect your brand's
                prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Customized awards that reflect your brand's prestige. Our
              collection includes exclusive awards that reflect your brand's
              prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>

          {/* container Promotional Items */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Promotional Items
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={uiuxDesign}
                alt="quartz project"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Distinctive promotional items that enhance your brand's
                visibility. Our collection includes branded merchandise,
                corporate accessories, and exclusive awards that reflect your
                brand's prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Distinctive promotional items that enhance your brand's
              visibility. Our collection includes branded merchandise, corporate
              accessories, and exclusive awards that reflect your brand's
              prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 md:px-15">
        <div className="cards w-full flex flex-col md:flex-row gap-5 md:gap-15 mt-5 md:mt-10">
          {/* container Corporate Accessories */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Corporate Accessories
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={twoDThreeD}
                alt=""
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Elegant corporate accessories that reflect your brand's
                prestige. Our collection includes branded merchandise, corporate
                accessories, and exclusive awards that reflect your brand's
                prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Elegant corporate accessories that reflect your brand's prestige.
              Our collection includes branded merchandise, corporate
              accessories, and exclusive awards that reflect your brand's
              prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>

          {/* container Bespoke Gift Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary mb-4">
                Bespoke Gift Solutions
              </h2>
            </div>
            <div className="cardcontainer relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group hover:scale-95 transition-all duration-300 cursor-pointer">
              <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                src={digitalMarketing}
                alt="quartz project"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

              <motion.h2
                className="px-5 absolute inset-0 items-center justify-center text-4xl md:text-5xl font-grotesk text-white leading-tight text-center hidden md:flex"
                initial={{ y: 100, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.5,
                }}
              >
                Unique bespoke gift solutions that reflect your brand's
                prestige. Our collection includes branded merchandise, corporate
                accessories, and exclusive awards that reflect your brand's
                prestige.
              </motion.h2>
            </div>
            <p className="text-lg text-text font-grotesk mt-4 md:hidden">
              Unique bespoke gift solutions that reflect your brand's prestige.
              Our collection includes branded merchandise, corporate
              accessories, and exclusive awards that reflect your brand's
              prestige.
            </p>
            {/* WrapButton for mobile - shows after text */}
            <div className="mt-4 md:hidden flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Request Callback
              </button>
            </div>
            <div className="w-full h-[1px] bg-highlighttext mt-8 md:hidden"></div>
          </motion.div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-10">
        <Link to="/#contact">
          <button className="bg-primary text-white px-6 py-3 rounded-md text-lg sm:text-xl md:text-2xl">
            Contact Us Now For More Details
          </button>
        </Link>
      </div>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WhatCan;
