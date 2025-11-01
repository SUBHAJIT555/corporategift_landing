import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router';
import { IoCheckmarkCircle, IoHome, IoArrowBack } from 'react-icons/io5';

const ThankYou = () => {
    const fadeIn: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const scaleIn: Variants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
        },
    };

    return (

        <div className="min-h-screen w-full bg-black relative flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
            {/* Midnight Aurora Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 50% 50%,
        rgba(58, 123, 255, 0.25) 0%,
        rgba(100, 149, 237, 0.15) 25%,
        rgba(123, 104, 238, 0.07) 35%,
        transparent 50%
        )
        `,
                }}
            />
            <div className="max-w-3xl w-full text-center">
                {/* Success Icon */}
                <motion.div
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    className="mb-6 sm:mb-8 md:mb-10"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary/10 mb-4 sm:mb-6">
                        <IoCheckmarkCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary" />
                    </div>
                </motion.div>

                {/* Main Message */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="mb-6 sm:mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-text-primary mb-4">
                        Thank You!
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-text-primary mb-4">
                        We've received your inquiry
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
                        Our team will get in touch with you shortly to discuss your corporate gift needs.
                        We're excited to help you create something special!
                    </p>
                </motion.div>

                {/* Additional Information */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    className="mb-8 sm:mb-10 md:mb-12"
                >
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 max-w-xl mx-auto">
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2">
                            <span className="font-semibold">What's next?</span>
                        </p>
                        <ul className="text-xs sm:text-sm md:text-base text-gray-600 text-left space-y-2 max-w-md mx-auto">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>We'll review your requirements within 24 hours</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>Our expert will contact you via phone or email</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>We'll provide a customized quote based on your budget</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center h-12 sm:h-14 md:h-[50px] px-6 sm:px-8 md:px-10 bg-primary text-white text-base sm:text-lg md:text-xl rounded-md hover:bg-primary/80 transition-colors duration-200 w-full sm:w-auto min-w-[200px] sm:min-w-[250px]"
                    >
                        <IoHome className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                        Back to Home
                    </Link>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center justify-center h-12 sm:h-14 md:h-[50px] px-6 sm:px-8 md:px-10 bg-transparent border-2 border-text-primary text-text-primary text-base sm:text-lg md:text-xl rounded-md hover:bg-text-primary hover:text-white transition-colors duration-200 w-full sm:w-auto min-w-[200px] sm:min-w-[250px]"
                    >
                        <IoArrowBack className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                        Contact Again
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ThankYou;