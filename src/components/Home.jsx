import { motion } from "framer-motion";

const Home = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // faster fade-in
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // faster stagger
        delayChildren: 0.1, // less delay before starting
      },
    },
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: [0.15, 0.3, 0.15],
      scale: custom.scale || 1,
      y: custom.y || 0,
      transition: {
        opacity: {
          duration: custom.duration || 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: custom.duration || 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        },
        y: {
          duration: custom.duration || 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      },
    }),
  };

  return (
    <motion.div
      className="relative h-screen bg-black w-full overflow-hidden flex items-center justify-center px-6 md:px-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Geometric Animations */}
      <motion.div
        className="absolute top-0 right-20 w-24 h-24"
        variants={shapeVariants}
        custom={{ duration: 3 }}
      >
        <div className="bg-blue-500 opacity-20 w-12 h-12 transform rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 rounded-full bg-blue-500 opacity-10 w-32 h-32"
        variants={shapeVariants}
        custom={{ scale: [0.9, 1.1, 0.9], duration: 5 }}
      />

      <motion.div
        className="absolute right-24 top-24 rounded-xl bg-blue-500 opacity-10 w-28 h-28"
        variants={shapeVariants}
        custom={{ y: [-10, 10, -10], duration: 4 }}
      />

      <motion.div
        className="absolute right-48 bottom-16 rounded-full bg-blue-500 opacity-10 w-20 h-20"
        variants={shapeVariants}
        custom={{ y: [-10, 10, -10], duration: 6 }}
      />

      {/* Centered Content */}
      <motion.div variants={containerVariants} className="text-center z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          variants={textVariants}
        >
          Fueled by Creativity.
        </motion.h2>

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          variants={textVariants}
        >
          Powered by Code.
        </motion.h2>

        <motion.h3
          className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          variants={textVariants}
        >
          <span className="text-white">Hi! I'm </span>
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent font-extrabold">
            Roshan Kr Singh
          </span>
        </motion.h3>

        <motion.p
          className="text-gray-300 text-lg max-w-xl mx-auto mb-6"
          variants={textVariants}
        >
          Creating next-generation AI-driven solutions designed to push the
          boundaries of Natural language understanding and Generative
          Intelligence.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() =>
              window.open("https://github.com/Roshansingh9", "_blank")
            }
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>

          <button
            className="group px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="flex items-center">
              Get In Touch
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
