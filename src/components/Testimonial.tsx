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
    role: "HR Director, Emirates Group",
    image: fatimaAlMazrouei,
    quote:
      "Baharnani's corporate gifts have consistently impressed our employees and clients. Their attention to detail and quality is remarkable. Special thanks to Amit for his excellent service!",
  },
  {
    name: "Khaled Bin Saeed",
    role: "CEO, Al Futtaim Trading",
    image: khaledBinSaeed,
    quote:
      "Working with Shanavas at Baharnani has been fantastic. The customized gift sets they created for our VIP clients were elegant and perfectly represented our brand values.",
  },
  {
    name: "Leila Rahman",
    role: "Marketing Manager, Etisalat",
    image: leilaRahman,
    quote:
      "Baharnani delivered exceptional corporate gifts for our annual client appreciation event. The premium quality and attention to detail exceeded our expectations.",
  },
  {
    name: "Mohammed Al Falasi",
    role: "General Manager, Dubai Properties",
    image: mohammedAlFalasi,
    quote:
      "Amit from Baharnani provided excellent guidance in selecting the perfect corporate gifts. Their eco-friendly options and premium packaging really stood out.",
  },
  {
    name: "Rashid Al Nuaimi",
    role: "Director, Abu Dhabi Investment Authority",
    image: rashidAlNuaimi,
    quote:
      "The personalized service from Shanavas and the team at Baharnani is unmatched. Their corporate gifts have helped us strengthen our business relationships significantly.",
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 text-gray-800 tracking-tight font-light">
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
