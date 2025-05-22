import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full py-6" style={{ backgroundColor: "#050505" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white text-sm">
            Designed & Built By Roshan Kr Singh | © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
