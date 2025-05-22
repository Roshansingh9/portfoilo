import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiFastapi,
  SiPython,
  SiExpress,
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiTerraform,
} from "react-icons/si";
import { FaRocket, FaSearch, FaPalette } from "react-icons/fa";

const TechStack = () => {
  const [activeConnections, setActiveConnections] = useState([]);

  // Skills data with Lobe Hub icons for specific technologies and React Icons for others
  const skillsData = {
    layers: [
      {
        id: "frontend",
        name: "Frontend",
        position: { x: 150, y: 225 },
        skills: [
          {
            name: "React",
            icon: SiReact,
            type: "react-icon",
            color: "#61dafb",
          },
          {
            name: "JavaScript",
            icon: SiJavascript,
            type: "react-icon",
            color: "#f7df1e",
          },
          {
            name: "HTML/CSS",
            icon: SiHtml5,
            type: "react-icon",
            color: "#e34f26",
          },
        ],
      },
      {
        id: "backend",
        name: "Backend",
        position: { x: 300, y: 225 },
        skills: [
          {
            name: "Node.js",
            icon: SiNodedotjs,
            type: "react-icon",
            color: "#339933",
          },
          {
            name: "FastAPI",
            icon: SiFastapi,
            type: "react-icon",
            color: "#009688",
          },
          {
            name: "Python",
            icon: SiPython,
            type: "react-icon",
            color: "#3776ab",
          },
          {
            name: "Express",
            icon: SiExpress,
            type: "react-icon",
            color: "#000000",
          },
        ],
      },
      {
        id: "ai_ml",
        name: "AI/ML",
        position: { x: 450, y: 225 },
        skills: [
          {
            name: "TensorFlow",
            icon: SiTensorflow,
            type: "react-icon",
            color: "#ff6f00",
          },
          {
            name: "PyTorch",
            icon: SiPytorch,
            type: "react-icon",
            color: "#ee4c2c",
          },
          {
            name: "Groq",
            icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/groq.png",
            type: "lobe-icon",
            color: "#f97316",
          },
          {
            name: "HuggingFace",
            icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/huggingface.png",
            type: "lobe-icon",
            color: "#ffcc02",
          },
          {
            name: "LangChain",
            icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/langchain.png",
            type: "lobe-icon",
            color: "#1c64f2",
          },
          {
            name: "Ollama",
            icon: FaRocket,
            type: "react-icon",
            color: "#6b7280",
          },
        ],
      },
      {
        id: "database",
        name: "Database",
        position: { x: 600, y: 225 },
        skills: [
          {
            name: "MongoDB",
            icon: SiMongodb,
            type: "react-icon",
            color: "#4db33d",
          },
          {
            name: "PostgreSQL",
            icon: SiPostgresql,
            type: "react-icon",
            color: "#336791",
          },
          {
            name: "ChromaDB",
            icon: FaPalette,
            type: "react-icon",
            color: "#ff4081",
          },
          {
            name: "Qdrant",
            icon: FaSearch,
            type: "react-icon",
            color: "#dc2626",
          },
        ],
      },
      {
        id: "devops",
        name: "DevOps",
        position: { x: 750, y: 225 },
        skills: [
          {
            name: "Git",
            icon: SiGit,
            type: "react-icon",
            color: "#f05032",
          },
          {
            name: "Docker",
            icon: SiDocker,
            type: "react-icon",
            color: "#2496ed",
          },
          {
            name: "Kubernetes",
            icon: SiKubernetes,
            type: "react-icon",
            color: "#326ce5",
          },
          {
            name: "AWS",
            icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/aws.png",
            type: "lobe-icon",
            color: "#232f3e",
          },
          {
            name: "Terraform",
            icon: SiTerraform,
            type: "react-icon",
            color: "#7b42bc",
          },
        ],
      },
      {
        id: "output",
        name: "My Tech Stack",
        position: { x: 900, y: 225 },
        skills: [
          {
            name: "My Tech Stack",
            icon: FaRocket,
            type: "react-icon",
            color: "#8b5cf6",
          },
        ],
      },
    ],
    connections: [
      { from: { layer: 0, skill: 0 }, to: { layer: 1, skill: 0 } },
      { from: { layer: 0, skill: 0 }, to: { layer: 1, skill: 1 } },
      { from: { layer: 0, skill: 1 }, to: { layer: 1, skill: 0 } },
      { from: { layer: 0, skill: 1 }, to: { layer: 1, skill: 2 } },
      { from: { layer: 0, skill: 2 }, to: { layer: 1, skill: 3 } },
      { from: { layer: 1, skill: 0 }, to: { layer: 2, skill: 0 } },
      { from: { layer: 1, skill: 0 }, to: { layer: 2, skill: 1 } },
      { from: { layer: 1, skill: 1 }, to: { layer: 2, skill: 2 } },
      { from: { layer: 1, skill: 2 }, to: { layer: 2, skill: 3 } },
      { from: { layer: 1, skill: 3 }, to: { layer: 2, skill: 4 } },
      { from: { layer: 2, skill: 0 }, to: { layer: 3, skill: 0 } },
      { from: { layer: 2, skill: 1 }, to: { layer: 3, skill: 1 } },
      { from: { layer: 2, skill: 2 }, to: { layer: 3, skill: 2 } },
      { from: { layer: 2, skill: 3 }, to: { layer: 3, skill: 3 } },
      { from: { layer: 2, skill: 4 }, to: { layer: 3, skill: 0 } },
      { from: { layer: 2, skill: 5 }, to: { layer: 3, skill: 1 } },
      { from: { layer: 3, skill: 0 }, to: { layer: 4, skill: 0 } },
      { from: { layer: 3, skill: 1 }, to: { layer: 4, skill: 1 } },
      { from: { layer: 3, skill: 2 }, to: { layer: 4, skill: 2 } },
      { from: { layer: 3, skill: 3 }, to: { layer: 4, skill: 3 } },
      { from: { layer: 4, skill: 0 }, to: { layer: 5, skill: 0 } },
      { from: { layer: 4, skill: 1 }, to: { layer: 5, skill: 0 } },
      { from: { layer: 4, skill: 2 }, to: { layer: 5, skill: 0 } },
      { from: { layer: 4, skill: 3 }, to: { layer: 5, skill: 0 } },
      { from: { layer: 4, skill: 4 }, to: { layer: 5, skill: 0 } },
    ],
  };

  // Container dimensions - uniform for all layers
  const CONTAINER_WIDTH = 120;
  const CONTAINER_HEIGHT = 400;
  const NODE_RADIUS = 22;

  // State to track which icons failed to load
  const [iconErrors, setIconErrors] = useState(new Set());

  // Simulate neural network activity with connection animations only
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly activate 3-6 connections
      const randomConnections = skillsData.connections
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 3);

      setActiveConnections(randomConnections);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Calculate evenly spaced positions for nodes within each container
  const calculateNodePositions = (
    layer,
    containerCenterX,
    containerCenterY
  ) => {
    const skillCount = layer.skills.length;
    const positions = [];

    if (skillCount === 1) {
      // Single node centered
      positions.push({
        x: containerCenterX,
        y: containerCenterY,
      });
    } else {
      // Multiple nodes evenly spaced vertically
      const startY = containerCenterY - CONTAINER_HEIGHT / 2 + 70;
      const endY = containerCenterY + CONTAINER_HEIGHT / 2 - 50;
      const spacing = (endY - startY) / (skillCount - 1);

      for (let i = 0; i < skillCount; i++) {
        positions.push({
          x: containerCenterX,
          y: startY + i * spacing,
        });
      }
    }

    return positions;
  };

  // Generate positioned skills data
  const positionedLayers = skillsData.layers.map((layer) => {
    const positions = calculateNodePositions(
      layer,
      layer.position.x,
      layer.position.y
    );
    const skillsWithPositions = layer.skills.map((skill, index) => ({
      ...skill,
      position: positions[index],
    }));

    return {
      ...layer,
      skills: skillsWithPositions,
    };
  });

  const getSkillPosition = (layerIndex, skillIndex) => {
    return positionedLayers[layerIndex].skills[skillIndex].position;
  };

  const handleImageError = (skillName) => {
    setIconErrors((prev) => new Set(prev).add(skillName));
  };

  const ConnectionLine = ({ connection, isActive }) => {
    const fromPos = getSkillPosition(
      connection.from.layer,
      connection.from.skill
    );
    const toPos = getSkillPosition(connection.to.layer, connection.to.skill);

    return (
      <g>
        {/* Base connection line */}
        <motion.line
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke={isActive ? "#00ff88" : "#374151"}
          strokeWidth={isActive ? "2" : "1"}
          opacity={isActive ? 0.9 : 0.3}
          animate={{
            stroke: isActive ? "#00ff88" : "#374151",
            strokeWidth: isActive ? "2" : "1",
            opacity: isActive ? [0.9, 0.4, 0.9] : 0.3,
          }}
          transition={{
            duration: isActive ? 1.5 : 0.5,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Glowing effect for active connections */}
        {isActive && (
          <motion.line
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke="#00ff88"
            strokeWidth="4"
            opacity={0.3}
            filter="url(#connectionGlow)"
            animate={{
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </g>
    );
  };

  const DataPulse = ({ connection }) => {
    const fromPos = getSkillPosition(
      connection.from.layer,
      connection.from.skill
    );
    const toPos = getSkillPosition(connection.to.layer, connection.to.skill);

    return (
      <motion.circle
        r="4"
        fill="#00ff88"
        filter="url(#pulseGlow)"
        initial={{ cx: fromPos.x, cy: fromPos.y, opacity: 0 }}
        animate={{
          cx: toPos.x,
          cy: toPos.y,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
    );
  };

  const SkillNode = ({ skill, layerIndex, skillIndex }) => {
    const IconComponent = skill.icon;
    const isReactIcon = skill.type === "react-icon";

    return (
      <g className="cursor-pointer group">
        {/* Static node circle with consistent glow */}
        <circle
          cx={skill.position.x}
          cy={skill.position.y}
          r={NODE_RADIUS}
          fill={skill.color}
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#nodeGlow)"
          className="transition-all duration-300"
        />

        {/* Icon using foreignObject */}
        <foreignObject
          x={skill.position.x - 12}
          y={skill.position.y - 12}
          width="24"
          height="24"
          className="pointer-events-none"
        >
          <div className="flex items-center justify-center w-full h-full">
            {isReactIcon ? (
              <IconComponent
                size={18}
                color="white"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
              />
            ) : (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-5 h-5 object-contain"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                  imageRendering: "crisp-edges",
                }}
                onError={() => handleImageError(skill.name)}
              />
            )}
          </div>
        </foreignObject>

        {/* Tooltip */}
        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <rect
            x={skill.position.x - 35}
            y={skill.position.y - 40}
            width="70"
            height="18"
            rx="9"
            fill="#1f2937"
            stroke="#374151"
            strokeWidth="1"
          />
          <text
            x={skill.position.x}
            y={skill.position.y - 27}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="10"
            className="pointer-events-none"
          >
            {skill.name}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-0"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Tech Stack
      </motion.h2>
      <div className="w-full h-screen flex items-center justify-center p-8">
        <div
          className="rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-4xl w-full"
          style={{ backgroundColor: "#0d0d0d" }}
        >
          <div className="relative w-full h-96 overflow-hidden">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Node glow filter */}
                <filter
                  id="nodeGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Connection glow filter */}
                <filter
                  id="connectionGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Pulse glow filter */}
                <filter
                  id="pulseGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Background grid pattern */}
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </pattern>
              </defs>

              {/* Background grid */}
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Uniform layer containers */}
              {positionedLayers.map((layer, index) => {
                const containerX = layer.position.x - CONTAINER_WIDTH / 2;
                const containerY = layer.position.y - CONTAINER_HEIGHT / 2;

                return (
                  <motion.g
                    key={layer.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {/* Uniform container background */}
                    <rect
                      x={containerX}
                      y={containerY}
                      width={CONTAINER_WIDTH}
                      height={CONTAINER_HEIGHT}
                      rx="15"
                      fill="rgba(55, 65, 81, 0.15)"
                      stroke="rgba(55, 65, 81, 0.4)"
                      strokeWidth="1"
                    />

                    {/* Layer label */}
                    <text
                      x={layer.position.x}
                      y={containerY - 10}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {layer.name}
                    </text>
                  </motion.g>
                );
              })}

              {/* Connections with animation */}
              {skillsData.connections.map((connection, index) => (
                <ConnectionLine
                  key={`connection-${index}`}
                  connection={connection}
                  isActive={activeConnections.includes(connection)}
                />
              ))}

              {/* Data pulses for active connections */}
              <AnimatePresence>
                {activeConnections.map((connection, index) => (
                  <DataPulse
                    key={`pulse-${index}-${Date.now()}`}
                    connection={connection}
                  />
                ))}
              </AnimatePresence>

              {/* Static skill nodes with calculated positions */}
              {positionedLayers.map((layer, layerIndex) =>
                layer.skills.map((skill, skillIndex) => (
                  <SkillNode
                    key={`${layerIndex}-${skillIndex}`}
                    skill={skill}
                    layerIndex={layerIndex}
                    skillIndex={skillIndex}
                  />
                ))
              )}
            </svg>
          </div>

          <motion.p
            className="text-gray-400 text-center mt-4 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          ></motion.p>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
