import { PageTransition } from "@/components/page-transition";
import { SocialLinks } from "@/components/social-links";
import { PERSONAL_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>{PERSONAL_INFO.name} - Portfolio</title>
        <meta name="description" content={PERSONAL_INFO.bio} />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {PERSONAL_INFO.name}
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl text-foreground/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {PERSONAL_INFO.title}
        </motion.h2>
        
        <motion.p 
          className="max-w-md mb-8 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {PERSONAL_INFO.bio}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SocialLinks />
        </motion.div>
      </div>
    </PageTransition>
  );
}
