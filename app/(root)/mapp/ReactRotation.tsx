import React, { useState, useRef, FC, ReactNode } from 'react';
import { motion, useDragControls } from 'framer-motion';


const RotatableComponent = ({children} : {children : ReactNode}) => {
  const [rotation, setRotation] = useState(0);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  const handleDrag = (info: any) => {

    console.log("::::::: info ::::::::");
    console.log(info);
    console.log("::::::: info ::::::::");

    const center = {
      x: constraintsRef.current!.offsetWidth / 2,
      y: constraintsRef.current!.offsetHeight / 2
    };
    const angle = Math.atan2(info.point.y - center.y, info.point.x - center.x);
    setRotation(angle * (180 / Math.PI));
  };

  return (
      <div ref={constraintsRef}>
        <motion.div
          drag
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          style={{ rotate: rotation }}
        >
         {children}
        </motion.div>
      </div>
  );
};

export default RotatableComponent;