import { useLocation } from "wouter";
import { NavLink } from "./ui/nav-link";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 bg-background/50 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex gap-8">
        <NavLink href="/projects" isActive={location === "/projects"}>
          projects
        </NavLink>
        <NavLink href="/" isActive={location === "/"}>
          home
        </NavLink>
        <NavLink href="/thoughts" isActive={location === "/thoughts"}>
          thoughts
        </NavLink>
      </div>
    </motion.nav>
  );
}