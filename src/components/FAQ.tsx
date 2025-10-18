import { useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiChatSmile2Fill } from "react-icons/ri";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Who should use Corporate Gifts?",
    answer:
      "Corporate Gifts is perfect for businesses of all sizes looking to strengthen relationships with clients, employees, and partners. Whether you're a startup, SME, or large corporation, our premium gift solutions help you make lasting impressions and build meaningful connections.",
  },
  {
    id: 2,
    question: "What is required to use Corporate Gifts?",
    answer:
      "You don't need anything special to use our corporate gift services. Simply browse our catalog, select your preferred items, specify quantities, and provide your branding requirements. We handle everything from customization to delivery, making the process seamless for your business.",
  },
  {
    id: 3,
    question: "Do I need to have design skills to customize gifts?",
    answer:
      "No design skills required! Our team of professional designers will work with you to create custom branding for your gifts. Simply provide your logo, brand guidelines, or describe your vision, and we'll bring it to life on your chosen products.",
  },
  {
    id: 4,
    question: "Do I need to have coding skills to use Corporate Gifts?",
    answer:
      "Absolutely not! Our platform is designed to be user-friendly and intuitive. You can browse, select, and customize gifts through our simple online interface without any technical knowledge required.",
  },
  {
    id: 5,
    question: "Why should I choose Corporate Gifts over similar services?",
    answer:
      "We offer premium quality products, expert customization services, fast turnaround times, and exceptional customer support. Our extensive catalog includes eco-friendly options, and we work with businesses of all sizes to deliver memorable corporate gifts that truly represent your brand.",
  },
  {
    id: 6,
    question: "What is the minimum order quantity?",
    answer:
      "Our minimum order quantity varies by product, but we typically start from 25 pieces for most items. For larger orders, we offer volume discounts. Contact our team for specific minimum quantities and pricing for your chosen products.",
  },
  {
    id: 7,
    question: "How long does customization take?",
    answer:
      "Customization timelines depend on the complexity of your requirements and the products chosen. Simple logo applications typically take 3-5 business days, while complex custom designs may take 7-10 business days. Rush orders are available for urgent needs.",
  },
  {
    id: 8,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! We have partnerships with reliable shipping providers to ensure your corporate gifts reach their destination safely and on time. Shipping costs and delivery times vary by location - contact us for specific international shipping quotes.",
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([2]); // Start with second item expanded

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-tight text-text-primary">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Chat Prompt */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed">
                Can't find what you are looking for?
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <p className="text-text-primary font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  We would like to chat with you.
                </p>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                    <RiChatSmile2Fill className="text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border-0 border-b border-dashed border-text-primary/30 focus:border-gray-400 focus:outline-none text-sm sm:text-base text-gray-500 placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* FAQ Items */}
            <div className="space-y-2 sm:space-y-4">
              {filteredFAQs.map((item) => (
                <div key={item.id} className="border-b border-text-primary/30">
                  <button
                    onClick={() => {
                      setExpandedItems([item.id]); // Only allow one item open at a time
                    }}
                    className="w-full py-3 sm:py-4 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-semibold text-black text-sm sm:text-base md:text-lg pr-4 group-hover:text-primary transition-colors duration-200">
                      {item.question}
                    </span>
                    <MdKeyboardArrowDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-all duration-300 ease-in-out flex-shrink-0 ${
                        expandedItems.includes(item.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedItems.includes(item.id) ? "auto" : 0,
                      opacity: expandedItems.includes(item.id) ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 sm:pb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredFAQs.length === 0 && searchTerm && (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gray-500 text-sm sm:text-base">
                  No questions found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
