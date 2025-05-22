import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px -15px rgba(5, 5, 5, 0.7)",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden w-full max-w-md mx-auto flex flex-col h-96"
      style={{ backgroundColor: "#0D0D0D" }}
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Project Image Area */}
      <div className="p-4 pb-0">
        <div
          className="h-48 rounded-xl flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          {project.coverimage ? (
            <img
              src={project.coverimage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-600">
              <div className="text-sm font-medium mb-1">Project Image</div>
              <div className="text-xs text-gray-500">
                Please add your content here.
                <br />
                Keep it short and simple. And
                <br />
                smile :)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="px-4 pb-2 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white text-sm leading-relaxed flex-1">
          {project.description}
        </p>
      </div>

      {/* Buttons Section - Fixed at bottom */}
      <div className="p-4 pt-2 flex gap-3 mt-auto">
        {/* Demo Link Button */}
        {project.demolink && (
          <motion.a
            href={project.demolink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl text-white text-sm font-medium text-center transition-colors hover:bg-blue-800"
            style={{ backgroundColor: "#1d4ed8" }}
            variants={buttonVariants}
            whileHover="hover"
          >
            Demo
          </motion.a>
        )}

        {/* GitHub Repository Link */}
        <motion.a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-xl text-gray-700 text-sm font-medium text-center transition-colors hover:bg-gray-300"
          style={{ backgroundColor: "#e5e7eb" }}
          variants={buttonVariants}
          whileHover="hover"
        >
          GitHub
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
