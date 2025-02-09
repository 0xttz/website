import { SiGithub, SiX, SiLinkedin, SiGoodreads, SiLichess } from "react-icons/si";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

const iconVariants = {
  hover: { y: -3, transition: { type: "spring", stiffness: 300 } }
};

const socialIcons = [
  { icon: SiGithub, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: SiX, href: SOCIAL_LINKS.x, label: "X (Twitter)" },
  { icon: SiLinkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: SiGoodreads, href: SOCIAL_LINKS.goodreads, label: "Goodreads" },
  { icon: SiLichess, href: SOCIAL_LINKS.lichess, label: "Lichess" },
];

export function SocialLinks() {
  return (
    <div className="flex gap-6 text-foreground/60">
      {socialIcons.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          variants={iconVariants}
          className="hover:text-foreground transition-colors"
          aria-label={label}
        >
          <Icon size={20} />
        </motion.a>
      ))}
    </div>
  );
}