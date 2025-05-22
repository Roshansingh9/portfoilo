import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import ProjectsSection from "./components/Projects/ProjectsSection";
import TechStack from "./components/Skills/TechStack";
import MediumLatestArticles from "./components/MediumLatestArticles";
import ContactSection from "./components/Contact/ContactSection";
import Footer from "./components/Footer";

const App = () => {
  // Smooth scrolling progress for progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Page transition animation
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Preloading animation
  useEffect(() => {
    // This simulates any initialization required
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Progress bar at the top of the page */}
      <motion.div
        className="progress-bar"
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, #4169E1 0%, #5A4FCF 50%, #EC4899 100%)",
          transformOrigin: "0%",
          zIndex: 1000,
        }}
      />

      <motion.div
        className="app-container"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/*<Navbar />*/}
        <main>
          <Home />
          <About />
          <ProjectsSection />
          <TechStack />
          <MediumLatestArticles username="roshan.kr.singh9857" maxItems={5} />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default App;
