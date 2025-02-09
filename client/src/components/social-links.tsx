import { SiGithub, SiX, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

const iconVariants = {
  hover: { y: -3, transition: { type: "spring", stiffness: 300 } }
};

export function SocialLinks() {
  return (
    <div className="flex gap-6 text-foreground/60">
      <motion.a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="hover:text-foreground transition-colors"
      >
        <SiGithub size={20} />
      </motion.a>
      <motion.a
        href={SOCIAL_LINKS.twitter}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="hover:text-foreground transition-colors"
      >
        <SiX size={20} />
      </motion.a>
      <motion.a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="hover:text-foreground transition-colors"
      >
        <SiLinkedin size={20} />
      </motion.a>
    </div>
  );
}