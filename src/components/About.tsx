// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from "framer-motion";
import FabLogo from "../assets/images/ClingLogo/Client-logo-1.webp";
import HimalayaLogo from "../assets/images/ClingLogo/Client-logo-2.webp";
import CareemLogo from "../assets/images/ClingLogo/Client-logo-3.webp";
import TalabatLogo from "../assets/images/ClingLogo/Client-logo-4.webp";
import ImperalBrandLogo from "../assets/images/ClingLogo/Client-logo-5.webp";
import KeetaLogo from "../assets/images/ClingLogo/Client-logo-6.webp";

import AboutHeroImage from "../assets/images/HeroImages/About-us.webp";
import { Link } from "react-router";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const clientLogos = [
    {
      name: "Fab",
      logo: FabLogo,
      alt: "Fab Logo",
    },
    {
      name: "Himalaya",
      logo: HimalayaLogo,
      alt: "Himalaya Logo",
    },

    {
      name: "Talabat",
      logo: TalabatLogo,
      alt: "Talabat Logo",
    },
    {
      name: "Imperal Brand",
      logo: ImperalBrandLogo,
      alt: "Imperal Brand Logo",
    },
    {
      name: "Careem",
      logo: CareemLogo,
      alt: "Careem Logo",
    },
    {
      name: "Keeta",
      logo: KeetaLogo,
      alt: "Keeta Logo",
    },
  ];

  return (
    <>
      <motion.section
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8  relative overflow-hidden"
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <div className="w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
          {/* Primary About Text */}
          <motion.div className="mb-12 sm:mb-14 md:mb-16" variants={container}>
            <motion.a
              href="#"
              className="inline-flex items-center text-text-primary  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl group mb-6 underline decoration-[0.5px] underline-offset-8"
              variants={fadeInUp}
            >
              <span className="relative underline underline-offset-8">
                ABOUT US
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                />
              </span>
            </motion.a>
            <motion.p
              className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight text-text-primary max-w-6xl"
              variants={fadeInUp}
            >
              Why Corporate Gifting Plays a Key Role in Dubai’s Business Culture.
            </motion.p>
          </motion.div>



          {/* Secondary About Text and CTA */}
          <motion.div
            className="flex flex-col lg:flex-row lg:justify-end"
            variants={container}
          >
            <div className="w-full lg:ml-auto flex flex-col lg:flex-row gap-10 sm:gap-15 md:gap-20 lg:gap-30">
              <motion.div
                className="lg:w-1/2 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16"
                variants={fadeInUp}
              >
                <img
                  src={AboutHeroImage}
                  alt="About"
                  className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </motion.div>
              <div className="lg:w-1/2 flex flex-col justify-between items-start">
                <motion.p
                  className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed text-text-primary mb-6 sm:mb-8"
                  variants={fadeInUp}
                >
                  Corporate gifts aren’t just tokens; they are strategic tools. A
                  thoughtfully branded gift keeps your company at the forefront of
                  recipients’ minds, nurtures loyalty, and conveys
                  professionalism. In the UAE’s relationship-driven culture,
                  presenting the right gift shows respect and builds meaningful
                  connections. Choosing sustainable items also demonstrates that
                  your brand values the environment.
                </motion.p>


                <Link to="/#contact" className="px-6 sm:px-8 py-2 sm:py-3 bg-primary transition-colors duration-300 text-white rounded-lg text-sm sm:text-base md:text-lg font-poppins w-fit cursor-pointer font-bold">
                  Contact Us
                </Link>

              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* Client Logos Bar */}
      <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 overflow-hidden relative">
        <div className="relative">
          {/* Section Heading */}
          <h2 className="text-center text-text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl  mb-8 sm:mb-12">
            Dubai's Finest Who Work With Us
          </h2>
          {/* Responsive logo display */}
          <div className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 flex-wrap px-2 sm:px-4">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.alt}
                  className="h-4 xs:h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 2xl:h-14 w-auto max-w-[80px] xs:max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] xl:max-w-[180px] 2xl:max-w-[200px] transition-all duration-500 opacity-100 hover:opacity-60 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
