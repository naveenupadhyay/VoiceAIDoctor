"use client";

import { motion } from "framer-motion";

export default function AudioSphere() {
  const circles = [0, 1, 2, 3];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        {circles.map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="rgba(0, 150, 255, 0.7)"
            strokeWidth="2"
            initial={{ r: 30, opacity: 1 }}
            animate={{
              r: [30, 90],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.5,
            }}
          />
        ))}
        <motion.circle
          cx="100"
          cy="100"
          r="20"
          fill="rgba(0, 150, 255, 0.5)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </svg>
    </div>
  );
}
