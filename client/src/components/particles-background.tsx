import { useCallback } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 30;

export function ParticlesBackground() {
  const getRandomPosition = useCallback(() => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
        const { x, y, size, duration } = getRandomPosition();
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/5"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
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
