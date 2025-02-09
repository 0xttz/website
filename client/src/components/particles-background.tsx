import { useCallback } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 50;

export function ParticlesBackground() {
  const getRandomPosition = useCallback(() => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      offsetX: (Math.random() - 0.5) * 30,
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[hsl(30,20%,97%)]">
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
        const { x, y, size, duration, delay, offsetX } = getRandomPosition();
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
              x: [0, offsetX, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}