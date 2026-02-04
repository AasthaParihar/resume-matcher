import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Reveal = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 } }
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
