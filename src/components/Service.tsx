import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import CallbackModal from "./CallbackModal";

import InnovationTechImage from "../assets/images/ServiceImages/Innovative-tech-gadgets.webp";
import SustainableEcoFriendlyImage from "../assets/images/ServiceImages/Sustainable-&-eco-friendly-gifts.webp";
import ExecutiveLuxuryGiftsImage from "../assets/images/ServiceImages/Executive-&-luxury-gifts.webp";
import OfficeDeskEssentialsImage from "../assets/images/ServiceImages/Office-&-desk-essentials.webp";
import DrinkwareGourmetHampersImage from "../assets/images/ServiceImages/Drinkware-&-gourmet-hampers.webp";
import BagsTravelAccessoriesImage from "../assets/images/ServiceImages/Bags-&-travel-accessories.webp";
import ApparelWearableBrandingImage from "../assets/images/ServiceImages/Apparel-&-wearable-branding.webp";
import GiftSetsHampersImage from "../assets/images/ServiceImages/Gift sets-&-hampers.webp";
import PromotionalGiveawaysImage from "../assets/images/ServiceImages/Promotional-giveaways.webp";

const SERVICES = [
  {
    title: "Innovative tech gadgets",
    description:
      "Stay ahead with modern essentials like wireless chargers, multi-device power banks, smart trackers and desk lamps. These practical tech gifts are perfect for corporate clients, events and employee programs.",
    image: InnovationTechImage,
  },
  {
    title: "Sustainable & eco-friendly gifts",
    description:
      "Show your commitment to sustainability with gifts made from recycled or renewable materials – solar power banks, recycled-plastic speakers, stainless-steel drinkware, organic cotton totes and plantable notebooks.",
    image: SustainableEcoFriendlyImage,
  },
  {
    title: "Executive & luxury gifts",
    description:
      "For VIP clients or leadership teams, choose engraved pens, leather portfolios, premium diaries and high-end speakers. These sophisticated pieces reflect prestige and appreciation.",
    image: ExecutiveLuxuryGiftsImage,
  },
  {
    title: "Office & desk essentials",
    description:
      "Personalised notebooks, diaries, calendars, pens and desk organisers help recipients stay organised while promoting your brand. Sustainable options, such as recycled paper notebooks, are also available.",
    image: OfficeDeskEssentialsImage,
  },
  {
    title: "Drinkware & gourmet hampers",
    description:
      "Reusable bottles, insulated flasks, custom coffee mugs and tumblers are practical and eco-friendly. Pair them with gourmet date boxes or snack hampers for special occasions like Ramadan or Eid.",
    image: DrinkwareGourmetHampersImage,
  },
  {
    title: "Bags & travel accessories",
    description:
      "From recycled-plastic laptop bags and smart backpacks to cotton totes and travel organisers, our bags offer long-term visibility and practicality.",
    image: BagsTravelAccessoriesImage,
  },
  {
    title: "Apparel & wearable branding",
    description:
      "Transform recipients into brand ambassadors with customised T-shirts, polo shirts, caps and jackets. Quality materials and professional printing ensure a stylish look.",
    image: ApparelWearableBrandingImage,
  },
  {
    title: "Gift sets & hampers",
    description:
      "Curated kits combine multiple items in a beautiful package. Choose from travel kits, tech gift sets or wellness hampers to create an unforgettable unboxing experience.",
    image: GiftSetsHampersImage,
  },
  {
    title: "Promotional giveaways",
    description:
      "For exhibitions and trade shows, our cost-effective promotional items – tote bags, lanyards, keychains, USB drives, stress balls and notebooks – maximise brand exposure and are easy to distribute.",
    image: PromotionalGiveawaysImage,
  },
];

const WhatCan = () => {
  // Scroll-triggered animations handled per-section via whileInView
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full py-10 md:py-20" id="services">
      <div className="w-full px-5 md:px-15  pb-10 md:pb-15">
        <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight text-text-primary tracking-tight text-text underline decoration-[0.5px] underline-offset-8">
          We Offer You The Best Corporate Gifts{" "}
          <span className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight text-text-primary underline decoration-[0.5px] underline-offset-8">
            {" "}
            in Dubai
          </span>
        </h3>

        <p className="text-lg md:text-lg lg:text-xl font-grotesk text-text mt-5 max-w-7xl leading-relaxed">
          Explore our curated categories below. A compact, alternating layout
          keeps everything scannable while matching our visual theme.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 px-5 md:px-15">
        {SERVICES.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <motion.section
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.05, 0.3),
              }}
              className={`group w-full rounded-xl border border-highlighttext/30 overflow-hidden border-dashed transition-all duration-300`}
            >
              <div
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-stretch bg-highlighttext/5 md:min-h-[280px]`}
              >
                <motion.div
                  className="md:w-2/5 w-full h-48 md:h-64 lg:h-72 relative overflow-hidden md:flex-shrink-0"
                  initial={{ x: -60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all p-4  duration-500 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0" />
                </motion.div>
                <motion.div
                  className="md:w-3/5 w-full p-5 md:p-8 flex flex-col justify-center relative md:flex-1"
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                >
                  {/* Desktop badge (absolute) only on lg+ */}
                  <div className="hidden lg:block absolute top-4 left-5 md:left-8">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-medium shadow">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Title row with badge inline on mobile & tablet */}
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-medium shadow shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-light text-text-primary capitalize">
                      {item.title}
                    </h4>
                    <span className="h-[2px] w-10 md:w-14 bg-primary/70 rounded"></span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg font-grotesk text-text mt-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-primary text-white px-4 py-2 rounded-md text-sm md:text-base hover:opacity-90 active:opacity-80 cursor-pointer hover:bg-primary/90"
                    >
                      Request Callback
                    </button>
                    <Link to="/#contact">
                      <button className="border border-primary text-primary px-4 py-2 rounded-md text-sm md:text-base hover:bg-primary/10 cursor-pointer">
                        Contact
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center mt-10">
        <Link to="/#contact">
          <button className="bg-primary text-white px-6 py-3 rounded-md text-lg sm:text-xl md:text-2xl">
            Contact Us Now For More Details
          </button>
        </Link>
      </div>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WhatCan;
