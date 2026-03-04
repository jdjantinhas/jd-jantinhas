import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
    // Estabiliza as opções para evitar re-inicializações desnecessárias (causa de Reflow)
    const emblaOptions = useMemo(() => ({
        align: 'start',
        loop: true,
        skipSnaps: false,
        duration: 20,
        ...options
    }), [options]);

    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    // Memoriza os estilos de controle para evitar cálculos geométricos no render
    const controlPositionStyles = useMemo(() => {
        const baseStyles = {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1000,
            backgroundColor: controlBgColor,
            borderRadius: '50px',
            padding: '8px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            // Otimização de renderização
            willChange: 'transform',
            contain: 'layout style'
        };

        let styles = { ...baseStyles };

        // Posição vertical
        if (controlPosition.includes('top')) {
            styles.top = `${controlOffset.y}px`;
        } else if (controlPosition.includes('bottom')) {
            styles.bottom = `${controlOffset.y}px`;
        }

        // Posição horizontal
        if (controlPosition.includes('left')) {
            styles.left = `${controlOffset.x}px`;
        } else if (controlPosition.includes('right')) {
            styles.right = `${controlOffset.x}px`;
        } else if (controlPosition.includes('center')) {
            styles.left = '50%';
            styles.transform = `translateX(calc(-50% + ${controlOffset.x}px))`;
        }

        return styles;
    }, [controlPosition, controlOffset, controlBgColor]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const onInit = useCallback(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onInit();
        onSelect();

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onInit);

        let intervalId;
        if (autoPlayInterval) {
            intervalId = setInterval(() => {
                if (emblaApi && emblaApi.canScrollNext()) {
                    emblaApi.scrollNext();
                } else if (emblaApi) {
                    emblaApi.scrollTo(0);
                }
            }, autoPlayInterval);
        }

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onInit);
            if (intervalId) clearInterval(intervalId);
        };
    }, [emblaApi, onSelect, onInit, autoPlayInterval]);

    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

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
            contain: 'layout paint', // Otimização crítica para evitar reflows globais
            ...style
        }}>
            <Box
                ref={emblaRef}
                sx={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    touchAction: 'pan-y pinch-zoom'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    marginLeft: 'calc(8px * -1)',
                    marginRight: 'calc(8px * -1)'
                }}>
                    {children}
                </Box>
            </Box>

            {showControls && (
                <Box
                    component="nav"
                    aria-label="Controles do carrossel"
                    sx={controlPositionStyles}
                >
                    {/* Indicadores (Dots) */}
                    <Box
                        role="tablist"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mr: 1
                        }}
                    >
                        {scrollSnaps.map((_, index) => (
                            <Box
                                key={index}
                                component="button"
                                role="tab"
                                aria-selected={selectedIndex === index}
                                aria-label={`Ir para o slide ${index + 1}`}
                                title={`Ir para o slide ${index + 1}`}
                                onClick={() => scrollTo(index)}
                                sx={{
                                    width: 44,
                                    height: 44,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    padding: 0,
                                    '&:focus-visible': {
                                        outline: `2px solid ${controlColor}`,
                                        outlineOffset: '2px'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: selectedIndex === index ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        bgcolor: selectedIndex === index ? controlColor : '#7a6565',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(110, 90, 90, 0.2)',
                        mx: 1
                    }} />

                    {/* Botões de Navegação */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        <Button
                            aria-label="Slide anterior"
                            title="Slide anterior"
                            onClick={scrollPrev}
                            sx={{
                                minWidth: 44,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                color: '#fff',
                                padding: 0,
                                '&:hover': {
                                    backgroundColor: controlColor
                                },
                                '&:focus-visible': {
                                    outline: `2px solid ${controlColor}`,
                                    outlineOffset: '2px'
                                }
                            }}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            aria-label="Próximo slide"
                            title="Próximo slide"
                            onClick={scrollNext}
                            sx={{
                                minWidth: 44,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                color: '#fff',
                                padding: 0,
                                '&:hover': {
                                    backgroundColor: controlColor
                                },
                                '&:focus-visible': {
                                    outline: `2px solid ${controlColor}`,
                                    outlineOffset: '2px'
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

export default React.memo(EmblaCarousel);