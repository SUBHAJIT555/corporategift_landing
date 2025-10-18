import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";
import { useAnimation } from "framer-motion";

const fatimaAlMazrouei = "https://randomuser.me/api/portraits/women/1.jpg";
const khaledBinSaeed = "https://randomuser.me/api/portraits/men/1.jpg";
const leilaRahman = "https://randomuser.me/api/portraits/women/2.jpg";
const mohammedAlFalasi = "https://randomuser.me/api/portraits/men/2.jpg";
const rashidAlNuaimi = "https://randomuser.me/api/portraits/men/3.jpg";

const testimonials = [
  {
    name: "Fatima Al Mazrouei",
    role: "CEO, Smart360",
    image: fatimaAlMazrouei,
    quote:
      "Ahlan's printing quality is exceptional! They delivered our corporate materials with perfect precision and vibrant colors that truly represent our brand.",
  },
  {
    name: "Khaled Bin Saeed",
    role: "Marketing Director, Creative Agency",
    image: khaledBinSaeed,
    quote:
      "The printing services at Ahlan are outstanding. From business cards to large banners, everything comes out perfectly every time.",
  },
  {
    name: "Leila Rahman",
    role: "Event Manager, EventPro",
    image: leilaRahman,
    quote:
      "Ahlan's attention to detail in printing is incredible. Our event materials always look professional and eye-catching!",
  },
  {
    name: "Mohammed Al Falasi",
    role: "CTO, WebApp Solutions",
    image: mohammedAlFalasi,
    quote:
      "Fast turnaround and excellent print quality. Ahlan has been our go-to printing partner for all our marketing materials.",
  },
  {
    name: "Rashid Al Nuaimi",
    role: "Founder, EventX",
    image: rashidAlNuaimi,
    quote:
      "Professional printing services with creative solutions. Ahlan always delivers high-quality results that exceed expectations!",
  },
];

const marqueeVariants = (direction: "left" | "right", duration: number) => ({
  animate: {
    x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration,
        ease: (t: number) => t,
      },
    },
  },
});

const TestimonialCard = ({ t }: { t: (typeof testimonials)[0] }) => (
  <div className="bg-[#080f0f]/10 border border-[#080f0f] px-4 py-5 sm:px-6 sm:py-6 min-w-[220px] max-w-[90vw] sm:min-w-[320px] sm:max-w-xs flex flex-col items-center text-center mx-2 my-2 rounded-lg shadow-sm">
    <img
      src={t.image}
      alt={t.name}
      className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-[#080f0f] transition-all duration-300 rounded-full mb-2"
    />
    <FaQuoteLeft className="text-[#499F68] text-lg sm:text-xl mb-2" />
    <p className="text-gray-700 italic font-serif text-sm sm:text-base mb-3">
      {t.quote}
    </p>
    <div className="flex mb-2">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className="text-[#7D84B2] w-3 h-3 sm:w-4 sm:h-4 mr-0.5"
        />
      ))}
    </div>
    <span className="font-semibold text-gray-900 text-sm sm:text-base">
      {t.name}
    </span>
    <span className="text-xs text-gray-500 font-medium">{t.role}</span>
  </div>
);

const Testimonial = () => {
  // Duplicate testimonials to ensure smooth looping
  const rowTestimonials = [...testimonials, ...testimonials];
  // Animation controls for each row
  const row1Controls = useAnimation();
  const row2Controls = useAnimation();
  const row3Controls = useAnimation();

  // Start animation on mount
  React.useEffect(() => {
    row1Controls.start("animate");
    row2Controls.start("animate");
    row3Controls.start("animate");
  }, [row1Controls, row2Controls, row3Controls]);

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-[#e1e1e1]">
      <div className="w-full py-10 px-8 md:px-15">
        <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-5 text-gray-800 tracking-tight font-light">
          What Our Clients Say
        </h2>
        <div className="h-px w-full bg-[#080f0f] mb-5"></div>
        <p className="max-w-2xl text-base sm:text-lg md:text-2xl text-gray-800 tracking-tight font-light">
          We are proud to have worked with some of the most innovative and
          forward-thinking companies in the region. Our clients trust us to
          deliver results that exceed their expectations.
        </p>
      </div>

      <div className="w-full mx-auto px-2 sm:px-15 bg-gradient-to-l from-[#e1e1e1] via-transparent to-[#e1e1e1]">
        <div>
          {/* Row 1: right */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-2 sm:gap-4 flex-nowrap"
              variants={marqueeVariants("right", 8)}
              animate={row1Controls}
              onMouseEnter={() => row1Controls.stop()}
              onMouseLeave={() => row1Controls.start("animate")}
            >
              {rowTestimonials.map((t, i) => (
                <TestimonialCard t={t} key={`row1-${i}`} />
              ))}
            </motion.div>
          </div>
          {/* Row 2: left */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-2 sm:gap-4 flex-nowrap"
              variants={marqueeVariants("left", 8)}
              animate={row2Controls}
              onMouseEnter={() => row2Controls.stop()}
              onMouseLeave={() => row2Controls.start("animate")}
            >
              {rowTestimonials.map((t, i) => (
                <TestimonialCard t={t} key={`row2-${i}`} />
              ))}
            </motion.div>
          </div>
          {/* Row 3: right */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-2 sm:gap-4 flex-nowrap"
              variants={marqueeVariants("right", 8)}
              animate={row3Controls}
              onMouseEnter={() => row3Controls.stop()}
              onMouseLeave={() => row3Controls.start("animate")}
            >
              {rowTestimonials.map((t, i) => (
                <TestimonialCard t={t} key={`row3-${i}`} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
