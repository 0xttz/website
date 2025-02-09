import { useCallback } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 100;

export function ParticlesBackground() {
  const getRandomPosition = useCallback(() => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Smaller particles
      duration: Math.random() * 15 + 10,
      offsetX: (Math.random() - 0.5) * 20, // Subtle horizontal movement
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[hsl(30,20%,97%)]">
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
        const { x, y, size, duration, offsetX } = getRandomPosition();
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/10"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              x: [0, offsetX, 0],
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}