import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const BannerSlide = ({ item }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Tablet e mobile

    // Posições diferentes para mobile/tablet vs desktop
    const dotPosition = isMobile ? {
        top: 23,
        left: '50%',
        transform: 'translateX(-50%)'
    } : {
        top: 30,
        left: 100,
        transform: 'none'
    };

    const subDotPosition = isMobile ? {
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)'
    } : {
        top: 70,
        left: 100,
        transform: 'none'
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                minHeight: { xs: '350px', md: '400px', lg: '500px' },
                padding: { xs: 0, md: 8 },
                margin: { xs: '10px', md: '20px' },
                borderRadius: { xs: '50px', md: '60px' },
                backgroundImage: `linear-gradient(to right, rgba(108, 22, 22, 0.1) 0%, rgba(108, 22, 22, 0.1) 20%), url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gradiente overlay para melhor legibilidade */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(63, 9, 9, 0.4) 0%, rgba(108, 22, 22, 0.1) 100%)',
                    zIndex: 1,
                }}
            />

            {/* Destaque Principal (dot) */}
            {item.dot && (
                <Box
                    sx={{
                        position: 'absolute',
                        ...dotPosition,
                        zIndex: 3,
                        height: { xs: '36px', md: '40px' },
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* Corpo central */}
                    <Box
                        sx={{
                            backgroundColor: '#AF1D1D',
                            padding: { xs: '0 12px', md: '0 16px' },
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: { xs: '18px 0', md: '20px 0' },
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                fontFamily: '"Inter", sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: { xs: '0.5px', md: '1px' },
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.dot}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Texto secundário (subDot) */}
            {item.subDot && (
                <Box
                    sx={{
                        position: 'absolute',
                        ...subDotPosition,
                        zIndex: 2,
                        backgroundColor: 'rgba(255, 215, 0, 0.9)',
                        padding: { xs: '3px 12px', md: '4px 16px' },
                        borderRadius: { xs: '0 15px', md: '0 20px' },
                        borderTop: 'none',
                        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#1A1A1A',
                            fontWeight: 600,
                            fontSize: { xs: '0.7rem', md: '0.75rem' },
                            fontFamily: '"Inter", sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: { xs: '0.3px', md: '0.5px' },
                        }}
                    >
                        {item.subDot}
                    </Typography>
                </Box>
            )}

            {/* Conteúdo principal */}
            <Box
                sx={{
                    flex: 1,
                    padding: { xs: 4, md: 4 },
                    textAlign: { xs: 'center', md: 'left' },
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    marginTop: item.dot ? (isMobile ? '100px' : '60px') : 0,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"Leckerli One", serif',
                        fontSize: { xs: '2.2rem', sm: '2.8rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        mb: 1,
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        lineHeight: 1.1,
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: '"Leckerli One", serif',
                        fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' },
                        mb: { xs: 3, md: 4 },
                        color: '#FFFFFF',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {item.subtitle}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: '"Inter", serif',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        mb: { xs: 3, md: 4 },
                        color: '#FFFFFF',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                        maxWidth: { xs: '100%', md: '750px' },
                        lineHeight: 1.6,
                        opacity: 0.9,
                    }}
                >
                    {item.description}
                </Typography>

                {/* Botão com borda gradiente vermelha */}
                <Box sx={{
                    display: 'inline-block',
                    mt: { xs: 2, md: 0 }
                }}>
                    <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        endIcon={<ArrowForward />}
                        sx={{
                            fontFamily: '"Inter", serif',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            padding: { xs: '6px 18px', md: '8px 22px' },
                            borderRadius: '50px',
                            border: { xs: '2px solid transparent', md: '3px solid transparent' },
                            background: `
                                linear-gradient(transparent, transparent) padding-box,
                                linear-gradient(135deg, rgba(175, 29, 29, 0.3), #FF6B6B) border-box
                            `,
                            color: '#FFF',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                background: `
                                    linear-gradient(rgba(175, 29, 29, 0.1), rgba(175, 29, 29, 0.1)) padding-box,
                                    linear-gradient(135deg, #AF1D1D, #FF6B6B) border-box
                                `,
                                transform: 'translateX(4px)',
                                boxShadow: '0 6px 16px rgba(175, 29, 29, 0.2)',
                            },
                            transition: 'all 0.3s ease',
                            textTransform: 'capitalize',
                            minWidth: { xs: '160px', md: 'auto' },
                        }}
                    >
                        {item.buttonText.replace('→', '').trim()}
                    </Button>
                </Box>
            </Box>

            {/* Espaço à direita para manter o layout flex (apenas desktop) */}
            {!isMobile && (
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'block' },
                        padding: 4,
                        position: 'relative',
                        zIndex: 2,
                    }}
                />
            )}
        </Box>
    );
};

export default BannerSlide;