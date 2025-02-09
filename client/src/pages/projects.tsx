import { PageTransition } from "@/components/page-transition";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ProjectCard } from "@/components/project-card";

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
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}