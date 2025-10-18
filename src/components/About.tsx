import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
      ref={ref}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8  relative overflow-hidden"
      id="about"
      style={{ opacity }}
    >
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Primary About Text */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 15 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 100, rotateX: 15 }
          }
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ y }}
          className="mb-12 sm:mb-14 md:mb-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center text-text-primary font-medium text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl group mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            whileHover={{
              x: 5,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-text-primary max-w-6xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Baharnani, a leading UAE corporate gifts supplier, serves Dubai, Abu
            Dhabi and Sharjah. We create premium customized gifts that build
            lasting business relationships.
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
          initial={{ opacity: 0, x: 100, rotateY: 15 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, rotateY: 0 }
              : { opacity: 0, x: 100, rotateY: 15 }
          }
          transition={{
            duration: 1.2,
            delay: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className="flex flex-col lg:flex-row lg:justify-end"
        >
          <div className="w-full lg:ml-auto flex flex-col lg:flex-row gap-10 sm:gap-15 md:gap-20 lg:gap-30">
            <div className="lg:w-1/2 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
              <img
                src="https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg"
                alt="About"
                className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-between items-start">
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed text-text-primary mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                At Baharnani, we specialize in creating premium corporate gifts
                that leave a lasting impression. Our expert team combines
                craftsmanship with innovation to deliver exceptional customized
                products across the UAE. From elegant corporate merchandise in
                Dubai to bespoke promotional items in Abu Dhabi and Sharjah, we
                take pride in helping businesses strengthen their relationships
                through thoughtfully curated gifts. Our in-house design team
                works closely with clients to ensure each piece reflects their
                brand identity while maintaining the highest standards of
                quality.
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
