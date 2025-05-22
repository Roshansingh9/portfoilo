import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

const ContactCard = ({ option }) => {
  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 40px -10px rgba(65, 105, 225, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Function to render the appropriate icon
  const renderIcon = (option) => {
    // First check if option.icon exists (for custom icons like LeetCode, Twitter, Medium)
    if (option.icon) {
      return option.icon;
    }

    // Fallback to iconName-based rendering (for lucide icons)
    switch (option.iconName) {
      case "linkedin":
        return <Linkedin size={24} className="text-blue-500" />;
      case "github":
        return <Github size={24} className="text-purple-500" />;
      case "mail":
        return <Mail size={24} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.a
      href={option.link}
      className="bg-[#0D0D0D] rounded-lg p-6 flex items-center border border-gray-700 hover:border-gray-600 shadow-[0_8px_25px_-5px_rgba(65,105,225,0.25)]"
      variants={cardVariants}
      whileHover="hover"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
        {renderIcon(option)}
      </div>

      {/* Text Content */}
      <div>
        <h3 className="text-white text-lg font-medium">{option.title}</h3>
        <p className="text-gray-400 text-sm">{option.description}</p>
      </div>
    </motion.a>
  );
};

export default ContactCard;
