import React, { useEffect } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Fade
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const CategoriesCarousel = ({
    categories,
    scrollToSection,
    activeCategory,
    onCategoryChange
}) => {
    const {
        scrollContainerRef,
        showLeftArrow,
        showRightArrow,
        canScroll,
        scrollLeft,
        scrollRight,
        scrollToElement
    } = useHorizontalScroll(200);

    // Rola para a categoria ativa quando ela muda
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const activeElement = scrollContainerRef.current.querySelector(
                `[data-category-id="${activeCategory}"]`
            );
            if (activeElement) {
                setTimeout(() => {
                    scrollToElement(activeElement);
                }, 300);
            }
        }
    }, [activeCategory, scrollContainerRef, scrollToElement]);

    const handleCategoryClick = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category.id);
        }
        scrollToSection(category.id);

        // Rola para centralizar o chip clicado
        setTimeout(() => {
            const clickedElement = scrollContainerRef.current?.querySelector(
                `[data-category-id="${category.id}"]`
            );
            if (clickedElement) {
                scrollToElement(clickedElement);
            }
        }, 50);
    };

    return (
        <Box sx={{
            position: 'relative',
            mb: { xs: 4, md: 6 },
            '&:hover .scroll-button': {
                opacity: 0.9,
            }
        }}>
            {/* Botão esquerdo */}
            <Fade in={showLeftArrow && canScroll}>
                <IconButton
                    onClick={scrollLeft}
                    className="scroll-button"
                    sx={{
                        position: 'absolute',
                        left: { xs: -4, sm: -8 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        backgroundColor: 'rgba(175, 29, 29, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(175, 29, 29, 1)',
                            transform: 'translateY(-50%) scale(1.1)',
                        },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: 0,
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <ChevronLeftIcon fontSize="small" />
                </IconButton>
            </Fade>

            {/* Botão direito */}
            <Fade in={showRightArrow && canScroll}>
                <IconButton
                    onClick={scrollRight}
                    className="scroll-button"
                    sx={{
                        position: 'absolute',
                        right: { xs: -4, sm: -8 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        backgroundColor: 'rgba(175, 29, 29, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(175, 29, 29, 1)',
                            transform: 'translateY(-50%) scale(1.1)',
                        },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: 0,
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            </Fade>

            {/* Gradientes nas bordas */}
            {canScroll && (
                <>
                    <Box sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '40px',
                        background: 'linear-gradient(90deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%)',
                        pointerEvents: 'none',
                        zIndex: 15,
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '40px',
                        background: 'linear-gradient(270deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%)',
                        pointerEvents: 'none',
                        zIndex: 15,
                    }} />
                </>
            )}

            {/* Container das categorias */}
            <Box
                ref={scrollContainerRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    gap: { xs: 1.5, sm: 2 },
                    pb: 2,
                    pt: 1,
                    px: { xs: 2, sm: 0 },
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#AF1D1D transparent',
                    '&::-webkit-scrollbar': {
                        height: '6px',
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#AF1D1D',
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: '#8a1818',
                        }
                    },
                    '&::-webkit-scrollbar-button': {
                        display: 'none',
                    },
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                    '&:hover': {
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#AF1D1D',
                        }
                    }
                }}
            >
                {categories.map((categoria) => (
                    <Chip
                        key={categoria.id}
                        data-category-id={categoria.id}
                        icon={categoria.icone}
                        label={categoria.nome}
                        onClick={() => handleCategoryClick(categoria)}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                            padding: { xs: '8px 16px', md: '10px 20px' },
                            height: 'auto',
                            minHeight: { xs: '40px', md: '48px' },
                            backgroundColor: activeCategory === categoria.id
                                ? 'rgba(175, 29, 29, 0.9)'
                                : 'rgba(32, 4, 4, 0.9)',
                            color: 'white',
                            borderRadius: '24px',
                            backdropFilter: 'blur(10px)',
                            '& .MuiChip-icon': {
                                color: activeCategory === categoria.id ? '#af1d1d' : 'white',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                marginLeft: { xs: '8px', md: '10px' }
                            },
                            '&:hover': {
                                backgroundColor: activeCategory === categoria.id
                                    ? 'rgba(175, 29, 29, 1)'
                                    : 'rgba(138, 24, 24, 0.8)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(175, 29, 29, 0.4)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            border: activeCategory === categoria.id
                                ? '2px solid #af1d1d'
                                : '1px solid rgba(175, 29, 29, 0.3)',
                            flexShrink: 0,
                            minWidth: { xs: '140px', sm: '150px', md: '160px' },
                            position: 'relative',
                            overflow: 'hidden',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: activeCategory === categoria.id
                                    ? 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)'
                                    : 'transparent',
                                pointerEvents: 'none',
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CategoriesCarousel;