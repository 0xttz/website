import { PageTransition } from "@/components/page-transition";
import { SocialLinks } from "@/components/social-links";
import { ParticlesBackground } from "@/components/particles-background";
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

      <ParticlesBackground />

      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.p 
          className="max-w-md mb-12 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SocialLinks />
        </motion.div>
      </div>
    </PageTransition>
  );
}