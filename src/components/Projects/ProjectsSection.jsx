import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Define projects data directly in the component
const projectsData = [
  {
    id: 1,
    title: "VeriStream",
    description:
      "VeriStream is a powerful content analysis platform that helps users authenticate, analyze, and transform various forms of content.",
    coverimage: "/project_images/veristream.png",
    demolink: "https://veristream-six.vercel.app/",
    repo: "https://github.com/Roshansingh9/Veristream",
  },
  {
    id: 2,
    title: "InsightGenei.ai",
    description:
      "InsightGenei.ai is a cutting-edge full-stack application that revolutionizes how users interact with data. Speak to your database in plain English and get beautiful, insightful results instantly!",
    coverimage: "/project_images/insightgenei.png",
    repo: "https://github.com/Roshansingh9/insightgenei.ai",
    demolink: "https://insightgenei-ai.vercel.app/",
  },
];

const ProjectsSection = () => {
  // Animation variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="w-full py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {/* Projects container with staggered animation for children */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
