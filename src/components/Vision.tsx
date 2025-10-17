import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VisionMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
      style={{ opacity }}
    >
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left side - Think Big With Us */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -100, rotateY: 15 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, rotateY: 0 }
                : { opacity: 0, x: -100, rotateY: 15 }
            }
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          >
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-text-primary leading-tight"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Create Moment With Us.
            </motion.h3>
          </motion.div>

          {/* Right side - Vision content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, rotateY: 0 }
                : { opacity: 0, x: 100, rotateY: -15 }
            }
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 50, rotateX: 10 }
                }
                transition={{
                  duration: 1.0,
                  delay: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-text-primary uppercase tracking-wide leading-tight"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  VISION OF THE BRAND
                </motion.h2>
                <motion.div
                  className="w-1/2 h-0.5 bg-text-primary mt-2"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 1.4,
                  }}
                  style={{ originX: 0 }}
                />
              </motion.div>

              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-xl text-text-primary leading-relaxed max-w-4xl"
                initial={{ opacity: 0, y: 30, rotateX: 5 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 30, rotateX: 5 }
                }
                transition={{
                  duration: 1.0,
                  delay: 1.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                At Baharnani, we strive to be at the forefront of corporate
                gifting excellence, building lasting business relationships
                through premium customized products. Through our comprehensive
                platform, we provide businesses with cutting-edge gift solutions
                and personalized experiences across the UAE. Our mission is to
                empower organizations to strengthen their relationships and
                enhance their brand presence through thoughtfully curated gifts
                that leave a lasting impression in an increasingly competitive
                business world.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
        className="mt-12 sm:mt-16 md:mt-20"
        initial={{ opacity: 0, y: 100, rotateX: 15 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 0 }
            : { opacity: 0, y: 100, rotateX: 15 }
        }
        transition={{
          duration: 1.2,
          delay: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <motion.img
              src="https://images.pexels.com/photos/33277846/pexels-photo-33277846.jpeg"
              alt="Corporate gifting and business relationships concept"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.8,
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2.0,
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default VisionMission;
