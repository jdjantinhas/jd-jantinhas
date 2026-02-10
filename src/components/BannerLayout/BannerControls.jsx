import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const BannerControls = ({ scrollSnaps, selectedIndex, scrollTo }) => {
    return (
        <>
            {/* Botões de navegação */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '30px',
                right: '30px',
                transform: 'translateY(-50%)',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
                zIndex: 10
            }}>
                <IconButton
                    onClick={() => scrollTo(selectedIndex - 1)}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'white' }
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                <IconButton
                    onClick={() => scrollTo(selectedIndex + 1)}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'white' }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Indicadores (dots) alinhados à esquerda */}
            <Box sx={{
                position: 'absolute',
                bottom: '40px', // Aumentei a distância do fundo
                left: { xs: '60px', md: '60px' }, // Alinhado à esquerda, maior no desktop
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 2, // Aumentei o espaçamento entre os dots
                zIndex: 10
            }}>
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: index === selectedIndex ? '#AF1D1D' : 'rgba(175, 29, 29, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: index === selectedIndex ? 'scale(1.1)' : 'scale(1)',
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </Box>
        </>
    );
};

export default BannerControls;