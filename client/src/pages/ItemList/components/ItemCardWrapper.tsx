import { ReactNode, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ItemCardWrapper = ({ children }: { children: ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.04 });
    } else {
      controls.start({ scale: 1 });
    }
  }, [isHovered, controls]);

  useEffect(() => {
    if (isHovered) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isHovered, controls]);
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={controls}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ItemCardWrapper;
