import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

const TestimonialCard = ({
  t,
  isActive,
}: {
  t: (typeof testimonials)[0];
  isActive: boolean;
}) => (
  <motion.div
    className={`bg-white border-2 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 w-full max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto flex flex-col items-center text-center rounded-xl sm:rounded-2xl  transition-all duration-300 ${
      isActive ? "border-primary  border-dashed" : "border-gray-200"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative mb-4 sm:mb-6">
      <img
        src={t.image}
        alt={t.name}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border-3 sm:border-4 border-primary rounded-full shadow-lg"
      />
      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary rounded-full p-1.5 sm:p-2">
        <FaQuoteLeft className="text-white text-xs sm:text-sm" />
      </div>
    </div>

    <p className="text-gray-700 italic font-serif text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed px-2 sm:px-0">
      "{t.quote}"
    </p>

    <div className="flex mb-3 sm:mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className="text-primary w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-0.5 sm:mr-1"
        />
      ))}
    </div>

    <div className="text-center">
      <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl mb-1">
        {t.name}
      </h4>
      <p className="text-xs sm:text-sm text-gray-600 font-medium">{t.role}</p>
    </div>
  </motion.div>
);

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-gray-800 font-light tracking-tight">
            What Our Clients Say
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-light leading-relaxed px-2 sm:px-0">
            We are proud to have worked with some of the most innovative and
            forward-thinking companies in the region. Our clients trust us to
            deliver results that exceed their expectations.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white border-2 border-primary rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-sm sm:text-base md:text-lg lg:text-xl" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white border-2 border-primary rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-sm sm:text-base md:text-lg lg:text-xl" />
          </button>

          {/* Testimonial Content */}
          <div className="px-8 sm:px-12 md:px-16 lg:px-20">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={currentIndex}
                t={testimonials[currentIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial Counter */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {currentIndex + 1} of {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
