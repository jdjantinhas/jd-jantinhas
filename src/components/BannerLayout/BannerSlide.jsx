import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const BannerSlide = ({ item, onNavigate, isFirst }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const dotPosition = isMobile
        ? { top: 23, left: '50%', transform: 'translateX(-50%)' }
        : { top: 30, left: 100 };

    const subDotPosition = isMobile
        ? { top: 60, left: '50%', transform: 'translateX(-50%)' }
        : { top: 70, left: 100 };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                minHeight: { xs: '350px', md: '400px', lg: '500px' },
                padding: { xs: 0, md: 8 },
                margin: { xs: '10px', md: '20px' },
                borderRadius: { xs: '50px', md: '60px' },
                overflow: 'hidden',
                // Otimização de renderização
                contain: 'paint'
            }}
        >
            {/* IMAGEM RESPONSIVA E OTIMIZADA */}
            <Box
                component="img"
                src={item.imageUrl}
                alt={item.title}
                // Otimização Crítica: 
                // - Se for o primeiro slide (isFirst), carrega imediatamente (eager) com alta prioridade (LCP).
                // - Se não for o primeiro, carrega apenas quando necessário (lazy).
                loading={isFirst ? "eager" : "lazy"}
                fetchpriority={isFirst ? "high" : "auto"}
                // Atributo sizes: Ajuda o navegador a escolher a melhor resolução da imagem
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    // Evita o "pulo" de layout (CLS)
                    aspectRatio: isMobile ? '16/9' : '21/9',
                    backgroundColor: '#1a0505'
                }}
            />

            {/* OVERLAY - MANTIDO DESIGN ORIGINAL */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(to right, rgba(63,9,9,0.6) 0%, rgba(108,22,22,0.3) 60%, rgba(0,0,0,0.2) 100%)',
                    zIndex: 1,
                }}
            />

            {/* DOT - MANTIDO DESIGN ORIGINAL */}
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
                    <Box
                        sx={{
                            backgroundColor: '#AF1D1D',
                            padding: { xs: '0 12px', md: '0 16px' },
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: { xs: '18px 0', md: '20px 0' },
                            boxShadow: '0 4px 12px rgba(0,0,0,0.9)',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                fontFamily: '"Inter", sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.dot}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* SUBDOT - MANTIDO DESIGN ORIGINAL */}
            {item.subDot && (
                <Box
                    sx={{
                        position: 'absolute',
                        ...subDotPosition,
                        zIndex: 2,
                        backgroundColor: 'rgba(255,215,0,0.9)',
                        padding: { xs: '3px 12px', md: '4px 16px' },
                        borderRadius: { xs: '0 15px', md: '0 20px' },
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
                            letterSpacing: '0.5px',
                        }}
                    >
                        {item.subDot}
                    </Typography>
                </Box>
            )}

            {/* CONTEÚDO - MANTIDO DESIGN ORIGINAL */}
            <Box
                sx={{
                    flex: 1,
                    padding: 4,
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
                        fontSize: { xs: '2.2rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        mb: 1,
                        lineHeight: 1.1,
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: '"Leckerli One", serif',
                        fontSize: { xs: '1.2rem', md: '1.6rem' },
                        mb: 4,
                    }}
                >
                    {item.subtitle}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        mb: 4,
                        maxWidth: { md: '750px' },
                        opacity: 0.9,
                    }}
                >
                    {item.description}
                </Typography>

                <Button
                    aria-label={`Ver cardápio de ${item.title}`}
                    variant="outlined"
                    size={isMobile ? 'medium' : 'large'}
                    endIcon={<ArrowForward />}
                    onClick={onNavigate}
                    sx={{
                        borderRadius: '50px',
                        border: '3px solid transparent',
                        background: `
                            linear-gradient(transparent, transparent) padding-box,
                            linear-gradient(135deg, #AF1D1D, #FF6B6B) border-box
                        `,
                        color: '#FFF',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateX(4px)',
                        },
                    }}
                >
                    {item.buttonText.replace('→', '').trim()}
                </Button>
            </Box>

            {!isMobile && <Box sx={{ flex: 1 }} />}
        </Box>
    );
};

export default BannerSlide;
