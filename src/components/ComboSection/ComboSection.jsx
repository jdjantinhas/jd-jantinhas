import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    Paper,
    Chip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import useEmblaCarousel from 'embla-carousel-react';

const ComboSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        containScroll: 'trimSnaps',
        draggable: true,
        skipSnaps: false
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    // Dados para o carrossel (cada slide tem texto à esquerda e imagem à direita)
    const slides = [
        {
            id: 1,
            tag: "Mais Popular",
            title: "O Combo Perfeito",
            subtitle: "Jantinha + Espetinho",
            description: [
                "Jantinha completa acompanhada de um espetinho suculento, feita na hora e no ponto certo.",
                "Sabor caseiro, porção caprichada e aquele gostinho que dá vontade de repetir."
            ],
            highlight: "Variadas opções de espetinhos!",
            buttonText: "Peça agora →",
            buttonLink: "/cardapio#jantinhas",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop",
            alt: "Combo Jantinha + Espetinho",
            icon: <RestaurantIcon />
        },
        {
            id: 2,
            tag: "Especialidade",
            title: "Espetinhos Premium",
            subtitle: "10 Tipos Diferentes",
            description: [
                "Carnes selecionadas, tempero caseiro e grelhados na hora.",
                "Perfeito para acompanhar com uma cerveja gelada."
            ],
            highlight: "Frango, carne, linguiça e muito mais!",
            buttonText: "Ver Espetinhos",
            buttonLink: "/cardapio#espetinhos",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&auto=format&fit=crop",
            alt: "Espetinhos Variados",
            icon: <LocalDiningIcon />
        },
        {
            id: 3,
            tag: "Para Compartilhar",
            title: "Porções Familiares",
            subtitle: "Para Compartilhar",
            description: [
                "Porções generosas para dividir com amigos e família.",
                "Batata frita, mandioca, bolinho de carne e muito mais."
            ],
            highlight: "Ideal para grupos e happy hour!",
            buttonText: "Ver Porções",
            buttonLink: "/cardapio#porcoes",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&auto=format&fit=crop",
            alt: "Porções Especiais",
            icon: <RestaurantIcon />
        },
        {
            id: 4,
            tag: "Refrescante",
            title: "Bebidas Geladas",
            subtitle: "Sucos & Refrigerantes",
            description: [
                "Refresque-se com nossos sucos naturais e refrigerantes.",
                "Perfeito para acompanhar qualquer refeição."
            ],
            highlight: "Suco natural feito na hora!",
            buttonText: "Ver Bebidas",
            buttonLink: "/cardapio#bebidas",
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=1200&auto=format&fit=crop",
            alt: "Bebidas Geladas",
            icon: <LocalBarIcon />
        }
    ];

    // Funções de navegação do carousel
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Auto-play
    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: '#0a0a0a',
                py: { xs: 3, md: 4 },
                borderTop: '1px solid rgba(175, 29, 29, 0.2)',
                borderBottom: '1px solid rgba(175, 29, 29, 0.2)',
                background: 'linear-gradient(180deg, #110A09 0%, #0a0a0a 100%)',
            }}
        >
            {/* Carrossel Principal */}
            <Box sx={{ position: 'relative' }}>
                {/* Botões de navegação */}
                <IconButton
                    onClick={scrollPrev}
                    sx={{
                        position: 'absolute',
                        left: { xs: 8, md: 16 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        backgroundColor: 'rgba(175, 29, 29, 0.9)',
                        color: 'white',
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        '&:hover': {
                            backgroundColor: '#AF1D1D',
                            transform: 'translateY(-50%) scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                    onClick={scrollNext}
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 16 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        backgroundColor: 'rgba(175, 29, 29, 0.9)',
                        color: 'white',
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        '&:hover': {
                            backgroundColor: '#AF1D1D',
                            transform: 'translateY(-50%) scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* Carousel Container */}
                <Box
                    ref={emblaRef}
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                        px: { xs: 0, md: 0 }
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        {slides.map((slide) => (
                            <Box
                                key={slide.id}
                                sx={{
                                    flex: '0 0 100%',
                                    minWidth: 0,
                                    position: 'relative'
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: 'rgba(32, 4, 4, 0.8)',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(175, 29, 29, 0.2)',
                                        borderRadius: { xs: 2, md: 3 },
                                        height: { xs: 'auto', md: '500px' },
                                        mx: { xs: 0, md: 0 }
                                    }}
                                >
                                    {/* CONTEÚDO PRINCIPAL - Desktop: 2 colunas, Mobile: 1 coluna */}
                                    <Grid container sx={{ height: '100%' }}>
                                        {/* COLUNA ESQUERDA - TEXTO (Desktop) */}
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{
                                                p: { xs: 3, sm: 4, md: 5 },
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(32, 4, 4, 0.95)',
                                                position: 'relative',
                                                zIndex: 2
                                            }}>
                                                {/* Tag */}
                                                <Chip
                                                    label={slide.tag}
                                                    icon={slide.icon}
                                                    sx={{
                                                        backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                                        color: '#af1d1d',
                                                        fontFamily: '"Libre Baskerville", serif',
                                                        fontWeight: 700,
                                                        fontSize: '0.7rem',
                                                        mb: 2,
                                                        alignSelf: 'flex-start'
                                                    }}
                                                />

                                                {/* Título Principal com Gradiente */}
                                                <Typography
                                                    variant="h1"
                                                    sx={{
                                                        fontFamily: '"Libre Baskerville", serif',
                                                        fontWeight: 700,
                                                        mb: 1,
                                                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                                                        lineHeight: 1.1,
                                                        background: 'linear-gradient(135deg, #af1d1d 0%, #AF1D1D 50%, #af1d1d 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text',
                                                        textFillColor: 'transparent',
                                                        backgroundSize: '200% auto',
                                                        animation: 'textShine 3s ease-in-out infinite alternate'
                                                    }}
                                                >
                                                    {slide.title}
                                                </Typography>

                                                {/* Subtítulo */}
                                                <Typography
                                                    variant="h2"
                                                    sx={{
                                                        fontFamily: '"Libre Baskerville", serif',
                                                        fontWeight: 700,
                                                        color: '#AF1D1D',
                                                        mb: 3,
                                                        fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
                                                    }}
                                                >
                                                    {slide.subtitle}
                                                </Typography>

                                                {/* Descrição */}
                                                <Box sx={{ mb: 4 }}>
                                                    {slide.description.map((paragraph, index) => (
                                                        <Typography
                                                            key={index}
                                                            variant="body1"
                                                            sx={{
                                                                fontFamily: '"Libre Baskerville", serif',
                                                                color: 'rgba(255, 255, 255, 0.9)',
                                                                mb: 2,
                                                                fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                                                                lineHeight: 1.6
                                                            }}
                                                        >
                                                            {paragraph}
                                                        </Typography>
                                                    ))}
                                                </Box>

                                                {/* Destaque */}
                                                <Box
                                                    sx={{
                                                        backgroundColor: 'rgba(175, 29, 29, 0.1)',
                                                        borderLeft: '3px solid #af1d1d',
                                                        p: 2.5,
                                                        mb: 4,
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontFamily: '"Libre Baskerville", serif',
                                                            fontWeight: 700,
                                                            color: '#C32020',
                                                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                                            fontStyle: 'italic'
                                                        }}
                                                    >
                                                        {slide.highlight}
                                                    </Typography>
                                                </Box>

                                                {/* Botão CTA */}
                                                <Button
                                                    variant="contained"
                                                    href={slide.buttonLink}
                                                    sx={{
                                                        backgroundColor: '#AF1D1D',
                                                        color: 'white',
                                                        fontFamily: '"Libre Baskerville", serif',
                                                        fontWeight: 700,
                                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                                        py: { xs: 1.5, md: 1.8 },
                                                        px: { xs: 3, md: 4 },
                                                        borderRadius: '30px',
                                                        textTransform: 'none',
                                                        width: 'fit-content',
                                                        '&:hover': {
                                                            backgroundColor: '#8a1818',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 10px 25px rgba(175, 29, 29, 0.4)',
                                                        },
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    {slide.buttonText}
                                                </Button>
                                            </Box>
                                        </Grid>

                                        {/* COLUNA DIREITA - IMAGEM (Desktop) */}
                                        <Grid item xs={12} md={6}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                    minHeight: { xs: '300px', md: '500px' },
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={slide.image}
                                                    alt={slide.alt}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        objectPosition: 'center',
                                                        display: 'block'
                                                    }}
                                                />

                                                {/* Overlay gradiente da esquerda para direita para desktop */}
                                                {isDesktop && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            background: 'linear-gradient(to right, rgba(32,4,4,0.7) 0%, rgba(32,4,4,0.4) 20%, rgba(32,4,4,0) 40%)',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Indicadores (Dots) - Ajustados conforme a imagem */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        position: { xs: 'static', md: 'absolute' },
                        bottom: { xs: 'auto', md: 24 },
                        left: { xs: 'auto', md: 'calc(50% - 560px)' }, // Ajustado para ficar alinhado com o conteúdo
                        gap: 1,
                        mt: { xs: 3, md: 0 },
                        zIndex: 10,
                        width: '100%',
                        maxWidth: '1200px',
                        margin: { xs: '0 auto', md: '0 auto' },
                        px: { xs: 0, md: 4 }
                    }}
                >
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => scrollTo(index)}
                            sx={{
                                width: { xs: 10, md: 12 },
                                height: { xs: 10, md: 12 },
                                borderRadius: '50%',
                                backgroundColor: index === selectedIndex ? '#AF1D1D' : 'rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: index === selectedIndex ? '#AF1D1D' : 'rgba(255, 255, 255, 0.5)',
                                    transform: 'scale(1.2)'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <style jsx global>{`
                @keyframes textShine {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </Box>
    );
};

export default ComboSection;