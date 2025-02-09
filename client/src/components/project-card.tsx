import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  details?: string;
}

export function ProjectCard({ title, description, tags, link, details }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="group"
    >
      <motion.div 
        layout
        className="p-6 hover:bg-foreground/5 transition-colors rounded-lg cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div layout className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium text-foreground/90">{title}</h2>
          <div className="flex items-center gap-4">
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground/60 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-foreground/40" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.p layout className="text-foreground/60 mb-4">{description}</motion.p>
        
        <motion.div layout className="flex gap-3 flex-wrap">
          {tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className="text-sm text-foreground/40"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <AnimatePresence>
          {isExpanded && details && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-foreground/10"
            >
              <p className="text-foreground/70 whitespace-pre-line">
                {details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
