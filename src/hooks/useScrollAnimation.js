import { useRef, useEffect } from 'react';
import { useInView, useAnimation, motion } from 'framer-motion';

export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
        ...options
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return [ref, controls];
};

// Hook para animação de parallax
export const useParallax = (distance = 50) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

    return [ref, y];
};

// Hook para animação de stagger
export const useStaggerAnimation = (itemsCount, delay = 0.1) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: delay,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return {
        containerRef,
        containerVariants,
        itemVariants,
        isInView
    };
};