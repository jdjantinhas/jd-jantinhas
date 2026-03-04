import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const BannerControls = ({ scrollSnaps, selectedIndex, scrollTo }) => {
    return (
        <>
            {/* Botões de navegação lateral */}
            <Box
                component="nav"
                aria-label="Navegação do Banner"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '30px',
                    right: '30px',
                    transform: 'translateY(-50%)',
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'space-between',
                    zIndex: 10
                }}
            >
                <IconButton
                    onClick={() => scrollTo(selectedIndex - 1)}
                    aria-label="Slide anterior"
                    title="Slide anterior"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'white' }
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                <IconButton
                    onClick={() => scrollTo(selectedIndex + 1)}
                    aria-label="Próximo slide"
                    title="Próximo slide"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'white' }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Indicadores (dots) alinhados à esquerda */}
            <Box
                role="tablist"
                aria-label="Slides do banner"
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    left: { xs: '60px', md: '60px' },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 2,
                    zIndex: 10
                }}
            >
                {scrollSnaps.map((_, index) => (
                    <Box
                        key={index}
                        component="button"
                        role="tab"
                        aria-selected={index === selectedIndex}
                        aria-label={`Ir para o slide ${index + 1}`}
                        title={`Ir para o slide ${index + 1}`}
                        onClick={() => scrollTo(index)}
                        sx={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: index === selectedIndex ? '#AF1D1D' : 'rgba(175, 29, 29, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: index === selectedIndex ? 'scale(1.1)' : 'scale(1)',
                            padding: 0,
                            '&:focus-visible': {
                                outline: '2px solid #AF1D1D',
                                outlineOffset: '2px'
                            }
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default BannerControls;
