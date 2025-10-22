import { motion } from "framer-motion";
import VisionImage from "../assets/images/HeroImages/Vision-of-the-brand.webp"

const VisionMission = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <motion.section
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
      id="vision"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left side - Think Big With Us */}
          <motion.div className="lg:col-span-1" variants={fadeInUp}>
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-text-primary leading-tight"
              variants={fadeInUp}
            >
              Create Moment With Us.
            </motion.h3>
          </motion.div>

          {/* Right side - Vision content */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="space-y-4 sm:space-y-6">
              <motion.div variants={fadeInUp}>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light text-text-primary uppercase tracking-wide leading-tight"
                  variants={fadeInUp}
                >
                  VISION OF THE BRAND
                </motion.h2>
                <motion.div
                  className="w-1/2 h-0.5 bg-text-primary mt-2"
                  variants={fadeInUp}
                />
              </motion.div>

              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-xl text-text-primary leading-relaxed max-w-4xl"
                variants={fadeInUp}
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
      <motion.div className="mt-12 sm:mt-16 md:mt-20" variants={fadeInUp}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <motion.img
              src={VisionImage}
              alt="Corporate gifting and business relationships concept"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              variants={fadeInUp}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              variants={fadeInUp}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default VisionMission;
