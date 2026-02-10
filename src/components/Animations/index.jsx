import React from 'react';
import { motion } from 'framer-motion';

// Container para animação em cascata
export const StaggerContainer = ({ children, delay = 0.1, ...props }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
            hidden: {},
            show: {
                transition: {
                    staggerChildren: delay
                }
            }
        }}
        {...props}
    >
        {children}
    </motion.div>
);

// Item para animação em cascata
export const StaggerItem = ({ children, ...props }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
        }}
        {...props}
    >
        {children}
    </motion.div>
);

// Animação de fade in
export const FadeIn = ({ children, delay = 0, direction = 'up', ...props }) => {
    const directionMap = {
        up: { y: 50 },
        down: { y: -50 },
        left: { x: -50 },
        right: { x: 50 },
        none: { x: 0, y: 0 }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionMap[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut"
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Animação de escala
export const ScaleIn = ({ children, delay = 0, ...props }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
            duration: 0.5,
            delay: delay,
            ease: "backOut"
        }}
        {...props}
    >
        {children}
    </motion.div>
);

// Animação de rotação
export const RotateIn = ({ children, delay = 0, ...props }) => (
    <motion.div
        initial={{ rotate: -10, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
            duration: 0.6,
            delay: delay,
            ease: "easeOut"
        }}
        {...props}
    >
        {children}
    </motion.div>
);

// Animação de slide
export const SlideIn = ({ children, from = "left", delay = 0, ...props }) => {
    const variants = {
        left: { x: -100 },
        right: { x: 100 },
        top: { y: -100 },
        bottom: { y: 100 }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...variants[from]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: "easeOut"
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Animação de card hover
export const CardHover = ({ children, ...props }) => (
    <motion.div
        whileHover={{
            y: -10,
            transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        {...props}
    >
        {children}
    </motion.div>
);

// Animação de texto digitando
export const TypewriterText = ({ text, delay = 0, ...props }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            y: 20
        }
    };

    return (
        <motion.div
            style={{
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden"
            }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            {...props}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ marginRight: "5px" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default {
    StaggerContainer,
    StaggerItem,
    FadeIn,
    ScaleIn,
    RotateIn,
    SlideIn,
    CardHover,
    TypewriterText
};