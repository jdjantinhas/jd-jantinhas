import React from 'react';
import { motion } from 'framer-motion';

const ScrollAnimationWrapper = ({
    children,
    delay = 0,
    duration = 0.5,
    x = 0,
    y = 50,
    scale = 1,
    opacity = 1,
    className = '',
    style = {},
    once = true,
    amount = 0.3,
    whileHover = {},
    whileTap = {},
    ...props
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: y,
                x: x,
                scale: scale
            }}
            whileInView={{
                opacity: opacity,
                y: 0,
                x: 0,
                scale: 1
            }}
            viewport={{ once: once, amount: amount }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1] // Smooth ease
            }}
            whileHover={whileHover}
            whileTap={whileTap}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimationWrapper;