import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const EmblaCarousel = ({
    children,
    showControls = true,
    controlPosition = 'bottom-left',
    controlColor = '#AF1D1D',
    controlBgColor = 'rgba(22, 10, 10, 0.9)',
    autoPlayInterval = 5000,
    controlOffset = { x: 0, y: 0 },
    options = {},
    style = {}
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        skipSnaps: false,
        duration: 20,
        ...options
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    // Função de posicionamento simplificada e direta
    const getControlPositionStyles = () => {
        const baseStyles = {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1000,
            backgroundColor: controlBgColor,
            borderRadius: '50px',
            padding: '8px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        };

        // Define posições base
        let styles = { ...baseStyles };

        // Posição vertical
        if (controlPosition.includes('top')) {
            styles.top = `${controlOffset.y}px`;
            delete styles.bottom;
        }
        if (controlPosition.includes('bottom')) {
            styles.bottom = `${controlOffset.y}px`;
            delete styles.top;
        }

        // Posição horizontal
        if (controlPosition.includes('left')) {
            styles.left = `${controlOffset.x}px`;
            delete styles.right;
            delete styles.transform;
        }
        if (controlPosition.includes('right')) {
            styles.right = `${controlOffset.x}px`;
            delete styles.left;
            delete styles.transform;
        }
        if (controlPosition.includes('center')) {
            styles.left = '50%';
            // Para center, aplica o offset no transform
            if (controlOffset.x !== 0 || controlOffset.y !== 0) {
                styles.transform = `translate(calc(-50% + ${controlOffset.x}px), 0)`;
            } else {
                styles.transform = 'translateX(-50%)';
            }
        }

        return styles;
    };

    const updateScrollSnaps = useCallback(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Scroll automático
    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        updateScrollSnaps();

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', updateScrollSnaps);

        let intervalId;
        if (autoPlayInterval) {
            intervalId = setInterval(() => {
                if (emblaApi) {
                    emblaApi.scrollNext();
                }
            }, autoPlayInterval);
        }

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', updateScrollSnaps);
            if (intervalId) clearInterval(intervalId);
        };
    }, [emblaApi, onSelect, updateScrollSnaps, autoPlayInterval]);

    const scrollTo = (index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            ...style
        }}>
            {/* Carousel container - OCUPA 100% */}
            <Box
                ref={emblaRef}
                sx={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    touchAction: 'pan-y pinch-zoom',
                    willChange: 'transform',
                    marginLeft: 'calc(8px * -1)', // Compensa padding
                    marginRight: 'calc(8px * -1)'
                }}>
                    {children}
                </Box>
            </Box>

            {showControls && (
                <Box sx={getControlPositionStyles()}>
                    {/* Indicadores */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mr: 1
                    }}>
                        {scrollSnaps.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => scrollTo(index)}
                                sx={{
                                    width: selectedIndex === index ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    bgcolor: selectedIndex === index ? controlColor : '#7a6565',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: selectedIndex === index ? '#E55A2B' : 'rgba(192, 179, 179, 0.5)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    {/* Divisor */}
                    <Box sx={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(110, 90, 90, 0.2)',
                        mx: 1
                    }} />

                    {/* Botões */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        <Button
                            onClick={scrollPrev}
                            sx={{
                                minWidth: '32px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                color: '#fff',
                                padding: 0,
                                '&:hover': {
                                    backgroundColor: controlColor
                                }
                            }}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            sx={{
                                minWidth: '32px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                color: '#fff',
                                padding: 0,
                                '&:hover': {
                                    backgroundColor: controlColor
                                }
                            }}
                        >
                            <ChevronRight />
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default EmblaCarousel;