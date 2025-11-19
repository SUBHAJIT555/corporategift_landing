
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { Link } from "react-router";
import darklogo from "../assets/logo/logo_dark.svg";
import termsAndConditions from "../assets/legal/Terms_&_Condition.pdf";
import privacyPolicy from "../assets/legal/Privacy_Policy.pdf";

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/baharnaniadv/",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/baharnaniadvertisingdubai/?originalSubdomain=ae",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/BAHARNANIADV",
    },
  ];

  return (
    <footer className="bg-background text-text-primary w-full px-4 sm:px-6 lg:px-8 ">
      {/* Main Footer */}
      <div className="border-t border-text-primary/50 border-dashed">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2 mb-8 sm:mb-0">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <Link to="/">
                  <div className="w-28 h-7 sm:w-52 sm:h-16">
                    <img src={darklogo} alt="Logo" className="w-full h-full" />
                  </div>
                </Link>
              </div>
              <p className="text-text-primary font-helvetica mb-4 sm:mb-6 leading-relaxed text-xl sm:text-2xl lg:max-w-[80%]">
                One place brings you the best corporate gift ideas, by just
                clicking a button you can get the gift you want at a competitive
                price!
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl text-text-primary hover:text-primary transition-all duration-300 touch-manipulation hover:scale-120"
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div className="mb-8 sm:mb-0">
              <h3 className="text-text-primary font-bold text-lg sm:text-xl mb-3 sm:mb-4 font-helvetica">
                USEFUL LINKS
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-text-primary/30 via-transparent to-transparent mb-3 sm:mb-4"></div>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/#about" },
                  { name: "Products", path: "/#products" },
                  { name: "Services", path: "/#services" },
                  { name: "Why Choose Us", path: "/#why_Choose_Us" },
                  { name: "FAQ", path: "/#FAQ" },
                  { name: "Contact", path: "/#contact" },
                ].map((item) => (
                  <motion.li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-text-primary hover:text-primary hover:translate-x-2 transition-all duration-300 font-helvetica text-lg sm:text-xl block py-1 touch-manipulation"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="mb-8 sm:mb-0">
              <h3 className="text-text-primary font-bold text-lg sm:text-xl mb-3 sm:mb-4 font-helvetica">
                LEGALS
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-text-primary/30 via-transparent to-transparent mb-3 sm:mb-4"></div>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  {
                    name: "Terms & Conditions",
                    path: termsAndConditions,
                    target: "_blank",
                  },
                  {
                    name: "Privacy Policy",
                    path: privacyPolicy,
                    target: "_blank",
                  },
                  { name: "Support", path: "mailto:vivek@baharnani.com" },
                ].map((item) => (
                  <motion.li key={item.name}>
                    <a
                      href={item.path}
                      target={item.target}
                      rel={
                        item.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-text-primary hover:text-primary hover:translate-x-2 transition-all duration-300 font-helvetica text-lg sm:text-xl block py-1 touch-manipulation"
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="mb-8 sm:mb-0">
              <h3 className="text-text-primary font-bold text-lg sm:text-xl mb-3 sm:mb-4 font-helvetica">
                CONTACTS
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-text-primary/30 via-transparent to-transparent mb-3 sm:mb-4"></div>
              <ul className="space-y-2 sm:space-y-3">
                <motion.li>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-primary" />
                    <span className="text-text-primary font-helvetica text-lg sm:text-xl">
                      Hot Line:
                    </span>
                  </div>
                  <a
                    href="tel:+971526240517"
                    className="text-text-primary hover:text-primary transition-all duration-300 font-helvetica text-lg sm:text-xl block py-1 touch-manipulation hover:translate-x-2"
                  >
                    +971 52 624 0517
                  </a>
                </motion.li>

                <motion.li>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
                    <span className="text-text-primary font-helvetica text-lg sm:text-xl">
                      Mail Us:
                    </span>
                  </div>
                  <a
                    href="mailto:vivek@baharnani.com"
                    className="text-text-primary hover:text-primary transition-all duration-300 font-helvetica text-lg sm:text-xl block py-1 touch-manipulation hover:translate-x-2"
                  >
                    vivek@baharnani.com
                  </a>
                </motion.li>

                <motion.li>
                  <div className="flex items-center gap-2">
                    <BiSolidNavigation className="text-primary" />
                    <span className="text-text-primary font-helvetica text-lg sm:text-xl">
                      Address:
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Baharnani+Advertising+LLC/@25.1626598,55.2318626,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69c4ae8eb43b:0x34670daac58a6f22!8m2!3d25.162655!4d55.2344375!16s%2Fg%2F11f66tl53w?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-primary transition-all duration-300 font-helvetica text-lg sm:text-xl block py-1 touch-manipulation hover:translate-x-2"
                  >
                    Baharnani Advertising LLC,
                    <br />
                    Sheikh Zayed Road – Dubai
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-text-primary/50 border-dashed mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="text-center ">
              <motion.p
                className="text-text-primary text-sm sm:text-base md:text-lg font-grotesk"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                &copy; {new Date().getFullYear()} {"{"}{" "}
                <Link
                  to="https://baharnani.com/"
                  target="_blank"
                  className="text-text-primary font-bwgradual hover:text-primary transition-colors duration-300"
                >
                  {` Baharnani Advertising LLC `}
                </Link>{" "}
                {"}"} All rights reserved. Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <FaHeart className="inline mx-1 text-text-primary" />
                </motion.span>{" "}
                by{" "}
                <Link
                  to="https://www.codecobble.com"
                  target="_blank"
                  className="text-text-primary font-bwgradual hover:text-primary transition-colors duration-300"
                >
                  codecobble
                </Link>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
