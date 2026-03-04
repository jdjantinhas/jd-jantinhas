import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';

// CORREÇÃO DE CAMINHOS: Importando as imagens para que o Vite as processe corretamente no build
import troperioImg from '../../assets/img/promocaotropeiro.webp';
import jantinhaImg from '../../assets/img/promocaojantinhas.webp';
import macarraoImg from '../../assets/img/promocaomacarrao.webp';

const slides = [
    {
        id: 1,
        title: 'Feijão Tropeiro em Dobro',
        subtitle: 'Compre 1, Leve outro por + R$3,00',
        description:
            'Compre um delicioso feijão tropeiro e leve outro por apenas R$3,00. Aproveite essa oferta incrível para saborear ainda mais o sabor autêntico do nosso feijão tropeiro.',
        buttonText: 'Peça agora',
        image: troperioImg,
    },
    {
        id: 2,
        title: 'Jantinha Completa',
        subtitle: 'Jantinha Completa com Espetinho',
        description:
            'Jantinha completa com espetinho de sua preferência. Um prato completo e saboroso para você aproveitar ao máximo.',
        buttonText: 'Experimente',
        image: jantinhaImg,
    },
    {
        id: 3,
        title: 'Delicioso Macarrão',
        subtitle: 'Macarrão com Molho Vermelho e mais...',
        description:
            'Delicioso macarrão com molhos. Perfeito para uma refeição rápida e saborosa.',
        buttonText: 'Aproveitar',
        image: macarraoImg,
    },
];

// Keyframes para animação de gradiente via CSS (se necessário, mas pode ser usado no componente que tem gradiente animado, não neste)
// Neste componente não há animação de gradiente, apenas botão com gradiente estático.

const HorizontalScrollCarousel = () => {
    // Verifica preferência por animações reduzidas (acessibilidade)
    const prefersReducedMotion = 
        typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

    return (
        <Box
            sx={{
                width: '100%',
                // Altura responsiva sem useMediaQuery
                height: { xs: 'auto', md: '520px' },
                minHeight: { xs: '600px', md: '520px' },
                overflow: 'hidden',
                position: 'relative',
                borderRadius: { xs: '20px', md: '0px' },
                mb: 3,
            }}
        >
            <EmblaCarousel
                showControls
                controlPosition="bottom-left"
                controlOffset={{ x: 20, y: 10 }}
                autoPlayInterval={prefersReducedMotion ? 0 : 5000}
                prevButtonLabel="Slide anterior"
                nextButtonLabel="Próximo slide"
                ariaLabel="Ofertas em destaque"
            >
                {slides.map((slide, index) => (
                    <Box
                        key={slide.id}
                        sx={{
                            flex: '0 0 100%',
                            minWidth: 0,
                            height: 'auto',
                            position: 'relative',
                        }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} de ${slides.length}: ${slide.title}`}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                height: { xs: 'auto', md: '540px' },
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: { xs: 2, md: 4 },
                                padding: { xs: 3, md: 5 },
                                backgroundColor: '#220901',
                            }}
                        >
                            {/* ÁREA DE TEXTO */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: { xs: '100%', md: '55%' },
                                    height: { xs: 'auto', md: '100%' },
                                    minHeight: { xs: '300px', md: 'auto' },
                                    zIndex: 2,
                                    padding: { xs: 2, md: 4 },
                                    order: { xs: 1, md: 'unset' },
                                }}
                            >
                                <Typography
                                    variant="h2" // Usando variant do tema, mas customizando tamanho
                                    component="h2"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                                        lineHeight: 1.1,
                                        mb: 1,
                                        background:
                                            'linear-gradient(130deg, #C32020 0%, #5D0F0F 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: '#C32020', // fallback
                                    }}
                                >
                                    {slide.title}
                                </Typography>

                                <Typography
                                    variant="h4" // usando variant
                                    component="p"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                        color: 'white',
                                        mb: 3,
                                        lineHeight: 1.1,
                                        textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {slide.subtitle}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        mb: 3,
                                        color: 'white',
                                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {slide.description}
                                </Typography>

                                <Button
                                    aria-label={`${slide.buttonText} – ${slide.title}`}
                                    variant="contained"
                                    size="large" // pode ser ajustado via CSS
                                    sx={{
                                        background:
                                            'linear-gradient(90deg, #C32020 0%, #5D0F0F 100%)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        borderRadius: '50px',
                                        px: 4,
                                        py: { xs: 1, md: 1.5 },
                                        fontSize: { xs: '1rem', md: '1.2rem' },
                                        textTransform: 'none',
                                        transition: 'all 0.3s ease',
                                        width: { xs: '100%', md: '220px' },
                                        '&:focus-visible': {
                                            outline: '2px solid white',
                                            outlineOffset: '2px',
                                        },
                                    }}
                                >
                                    {slide.buttonText}
                                </Button>
                            </Box>

                            {/* ÁREA DA IMAGEM OTIMIZADA */}
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '35%' },
                                    height: { xs: '250px', md: '100%' },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 1,
                                    order: { xs: 2, md: 'unset' },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={slide.image}
                                    alt={slide.title}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: { xs: '250px', md: '480px' },
                                        objectFit: 'cover',
                                        borderRadius: { xs: '20px', md: '30px' },
                                        maxWidth: '100%',
                                        display: 'block'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                ))}
            </EmblaCarousel>
        </Box>
    );
};

export default HorizontalScrollCarousel;