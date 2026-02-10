import { useRef, useState, useEffect, useCallback } from 'react';

export const useHorizontalScroll = (scrollStep = 200) => {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [canScroll, setCanScroll] = useState(false);

    const checkScrollPosition = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const isScrollable = scrollWidth > clientWidth;

            setCanScroll(isScrollable);
            setShowLeftArrow(isScrollable && scrollLeft > 10);
            setShowRightArrow(isScrollable && scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const itemWidth = container.children[0]?.offsetWidth || scrollStep;
            container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const itemWidth = container.children[0]?.offsetWidth || scrollStep;
            container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    };

    const scrollToElement = useCallback((element) => {
        if (!scrollContainerRef.current || !element) return;

        const container = scrollContainerRef.current;
        const containerWidth = container.clientWidth;
        const elementLeft = element.offsetLeft;
        const elementWidth = element.offsetWidth;

        // Centralizar o elemento
        const scrollLeft = elementLeft - (containerWidth - elementWidth) / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            checkScrollPosition();
        };

        const handleResize = () => {
            setTimeout(checkScrollPosition, 100); // Delay para garantir que o resize terminou
        };

        container.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Initial check
        setTimeout(checkScrollPosition, 100);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScrollPosition]);

    return {
        scrollContainerRef,
        showLeftArrow,
        showRightArrow,
        canScroll,
        scrollLeft,
        scrollRight,
        scrollToElement,
        checkScrollPosition
    };
};