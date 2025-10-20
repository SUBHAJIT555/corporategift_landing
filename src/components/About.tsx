
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from "framer-motion";

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
      name: "Nike",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
      alt: "Nike Logo",
    },
    {
      name: "Apple",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
      alt: "Apple Logo",
    },
    {
      name: "Google",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Google-Logo.png",
      alt: "Google Logo",
    },
    {
      name: "Microsoft",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Microsoft-Logo.png",
      alt: "Microsoft Logo",
    },
    {
      name: "Amazon",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
      alt: "Amazon Logo",
    },
    {
      name: "Meta",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Meta-Logo.png",
      alt: "Meta Logo",
    },
    {
      name: "Tesla",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Tesla-Logo.png",
      alt: "Tesla Logo",
    },
  ];

  return (
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

        {/* Client Logos Bar */}
        <div className="mb-12 md:mb-16 lg:mb-20 overflow-hidden relative">
          <div className="relative">
            {/* Static logo display */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
              {clientLogos.map((client, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 w-auto grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

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
                src="https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg"
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
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-primary transition-colors duration-300 text-white rounded-lg text-sm sm:text-base md:text-lg font-poppins w-fit cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
