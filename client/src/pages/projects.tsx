import { PageTransition } from "@/components/page-transition";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Projects() {
  return (
    <PageTransition>
      <Helmet>
        <title>Projects - Portfolio</title>
        <meta name="description" content="View my latest projects and work." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group"
            >
              <div className="p-4 hover:bg-foreground/5 transition-colors rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-medium text-foreground/90">{project.title}</h2>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="text-foreground/60 mb-4">{project.description}</p>
                <div className="flex gap-3 flex-wrap">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-sm text-foreground/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}