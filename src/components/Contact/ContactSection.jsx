import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Using react-icons for LinkedIn, GitHub, and Email
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ContactCard from "./ContactCard";
// Icons are now in public/icons/ folder, no imports needed

const ContactSection = () => {
  const contactOptions = [
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "Let's build professional connections and network together",
      link: "https://www.linkedin.com/in/roshan-kumar-singh-60b68a253/",
      iconName: "linkedin",
      icon: <FaLinkedin size={24} />,
    },
    {
      id: "github",
      title: "GitHub",
      description: "Explore my code, projects, and open-source contributions",
      link: "https://github.com/Roshansingh9",
      iconName: "github",
      icon: <FaGithub size={24} />,
    },
    {
      id: "leetcode",
      title: "LeetCode",
      description:
        "Want to know how good I am at DSA? Check my coding journey!",
      link: "https://leetcode.com/u/Roshan85/",
      iconName: "leetcode",
      icon: (
        <img
          src="/icons/leetcode.png"
          alt="LeetCode"
          className="w-full h-full object-cover rounded-full"
        />
      ),
    },
    {
      id: "email",
      title: "Email",
      description:
        "Drop me a line to discuss ideas, opportunities, or just say hi ☕",
      link: "mailto:roshan.kr.singh9857@gmail.com",
      iconName: "mail",
      icon: <FaEnvelope size={24} />,
    },
    {
      id: "twitter",
      title: "Twitter",
      description: "Follow my tech thoughts, insights, and daily updates",
      link: "https://x.com/Roshan854",
      iconName: "twitter",
      icon: (
        <img
          src="/icons/x.png"
          alt="Twitter/X"
          className="w-full h-full object-cover rounded-full"
        />
      ),
    },
    {
      id: "medium",
      title: "Medium",
      description:
        "Read my articles and insights about tech, development, and more",
      link: "https://medium.com/@roshan.kr.singh9857",
      iconName: "medium",
      icon: (
        <img
          src="/icons/medium.png"
          alt="Medium"
          className="w-full h-full object-cover rounded-full"
        />
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Start with LinkedIn and GitHub
  const [direction, setDirection] = useState(0);

  const cardsToShow = 2; // Using 2 cards for better visual balance

  // Function to get visible cards - ensuring no overlap
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % contactOptions.length;
      cards.push(contactOptions[index]);
    }
    return cards;
  };

  const slideNext = () => {
    setDirection(1);
    // Move by cardsToShow amount to ensure completely new set
    setCurrentIndex((prev) => (prev + cardsToShow) % contactOptions.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    // Move by cardsToShow amount to ensure completely new set
    setCurrentIndex(
      (prev) =>
        (prev - cardsToShow + contactOptions.length) % contactOptions.length
    );
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  return (
    <section id="contact" className="w-full py-16 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading - aligned to left */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <motion.button
            onClick={slidePrev}
            className="absolute left-0 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ outline: "2px solid #0cdcf7", outlineOffset: "2px" }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Cards Container */}
          <div className="overflow-visible mx-16 w-full max-w-4xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                style={{ zIndex: 10 }}
              >
                {getVisibleCards().map((option, index) => (
                  <motion.div
                    key={`${option.id}-${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                    style={{ zIndex: 15 }}
                  >
                    <ContactCard option={option} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={slideNext}
            className="absolute right-0 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ outline: "2px solid #0cdcf7", outlineOffset: "2px" }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Mobile fallback - show all cards in grid on small screens */}
        <div className="md:hidden mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactOptions.map((option) => (
              <div key={option.id} className="relative" style={{ zIndex: 10 }}>
                <ContactCard option={option} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
