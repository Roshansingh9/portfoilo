import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState([
    { id: 1, type: "command", text: "$ identity", visible: false },
    {
      id: 2,
      type: "response",
      text: " a passionate developer who thrives on solving complex problems with elegant and creative solutions.",
      visible: false,
    },
    { id: 3, type: "command", text: "$ interests", visible: false },
    {
      id: 4,
      type: "response",
      text: "Generative AI, Large Language Models (LLMs), Natural Language Processing and Deep Learning,",
      visible: false,
    },
    { id: 5, type: "command", text: "$ outside the IDE", visible: false },
    {
      id: 6,
      type: "response",
      text: "Avid anime watcher and movie buff — always recharging creativity through great stories and meaningful conversations.",
      visible: false,
    },
  ]);

  // Handle intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector("#terminal");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Handle typing animation effect
  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const nextLineIndex = terminalText.findIndex((line) => !line.visible);

      if (nextLineIndex !== -1) {
        const updatedLines = [...terminalText];
        updatedLines[nextLineIndex] = {
          ...updatedLines[nextLineIndex],
          visible: true,
        };
        setTerminalText(updatedLines);
      }
    }, 600); // Delay between lines

    return () => clearTimeout(timeout);
  }, [isVisible, terminalText]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-6 md:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
        About Me
      </motion.h2>

      {/* Terminal UI */}
      <motion.div
        id="terminal"
        className="w-full max-w-3xl bg-[#111111] border border-gray-700 rounded-lg overflow-hidden"
        variants={itemVariants}
      >
        {/* Terminal Header */}
        <div className="h-8 bg-[#222222] flex items-center px-4">
          <div className="h-3 w-3 rounded-full bg-[#FF5F56] mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E] mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
        </div>

        {/* Terminal Content with typing animation */}
        <div className="p-6 font-mono text-sm md:text-base space-y-4">
          {terminalText.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: line.visible ? 1 : 0 }}
              className="flex"
            >
              {line.type === "command" ? (
                <span className="text-blue-500">{line.text}</span>
              ) : (
                <span className="text-white ml-4">{line.text}</span>
              )}

              {/* Blinking cursor after the last visible line */}
              {line.visible &&
                terminalText.findIndex((l) => l.visible) ===
                  terminalText.findIndex((l) => l.id === line.id) && (
                  <motion.span
                    className="bg-white w-2 h-5 ml-1 inline-block"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
