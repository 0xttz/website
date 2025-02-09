import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function NavLink({ href, children, isActive, className }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
        isActive ? "text-foreground" : "text-foreground/60",
        className
      )}>
        {children}
        {isActive && (
          <motion.div
            layoutId="underline"
            className="absolute left-0 right-0 h-px bottom-0 bg-foreground"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        )}
      </a>
    </Link>
  );
}
