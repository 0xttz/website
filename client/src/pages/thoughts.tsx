import { PageTransition } from "@/components/page-transition";
import { THOUGHTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

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

export default function Thoughts() {
  return (
    <PageTransition>
      <Helmet>
        <title>Thoughts - Portfolio</title>
        <meta name="description" content="Read my latest thoughts and articles on technology and development." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {THOUGHTS.map((post, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group"
            >
              <div className="p-4 hover:bg-foreground/5 transition-colors rounded-lg">
                <div className="text-sm text-foreground/40 mb-2">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </div>
                <h2 className="text-xl font-medium mb-2 text-foreground/90">
                  {post.title}
                </h2>
                <p className="text-foreground/60">
                  {post.preview}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}