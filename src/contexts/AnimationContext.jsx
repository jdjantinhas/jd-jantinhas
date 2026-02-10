import React, { createContext, useContext, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const value = {
        scrollYProgress,
        scaleX,
        containerRef
    };

    return (
        <AnimationContext.Provider value={value}>
            {/* Barra de progresso de scroll */}
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#AF1D1D',
                    transformOrigin: '0%',
                    zIndex: 9999
                }}
            />

            <div ref={containerRef}>
                {children}
            </div>
        </AnimationContext.Provider>
    );
};