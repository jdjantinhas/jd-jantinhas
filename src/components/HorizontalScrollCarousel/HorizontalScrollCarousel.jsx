import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';

const HorizontalScrollCarousel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const slides = [
        {
            id: 1,
            title: 'Feijão Tropeiro em Dobro',
            subtitle: 'Compre 1, Leve outro por + R$3,00',
            description: 'Compre um delicioso feijão tropeiro e leve outro por apenas R$3,00. Aproveite essa oferta incrível para saborear ainda mais o sabor autêntico do nosso feijão tropeiro.',
            extraInfo: '',
            buttonText: 'Peça agora',
            img: 'src/assets/img/promocaotropeiro.png'
        },
        {
            id: 2,
            title: 'Jantinha Completa',
            subtitle: 'Jantinha Completa com Espetinho',
            description: 'Jantinha completa com espetinho de sua preferência. Um prato completo e saboroso para você aproveitar ao máximo.',
            extraInfo: '',
            buttonText: 'Experimente',
            img: 'src/assets/img/promocaojantinhas.png'
        },
        {
            id: 3,
            title: 'Delicioso Macarrão',
            subtitle: 'Macarrão com Molho Vermelho e mais...',
            description: 'Delicioso macarrão com molhos. Perfeito para uma refeição rápida e saborosa.',
            extraInfo: '',
            buttonText: 'Aproveitar',
            img: 'src/assets/img/promocaomacarrao.png'
        }
    ];

    return (
        <Box sx={{
            width: '100%',
            height: isMobile ? 'auto' : '520px',
            minHeight: isMobile ? '600px' : '520px',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: isMobile ? '20px' : '0px',
            mb: 3,
        }}>
            <EmblaCarousel
                showControls={true}
                controlPosition="bottom-left"
                controlOffset={{ x: 20, y: 10 }}
                autoPlayInterval={5000}
            >
                {slides.map((slide) => (
                    <Box key={slide.id} sx={{
                        flex: '0 0 100%',
                        minWidth: 0,
                        height: 'auto',
                        position: 'relative'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            height: isMobile ? 'auto' : '540px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: isMobile ? 2 : 4,
                            padding: isMobile ? 3 : 5,
                            backgroundColor: '#220901',
                        }}>
                            {/* Conteúdo de texto */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: isMobile ? '100%' : '55%',
                                height: isMobile ? 'auto' : '100%', // Altura automática no mobile
                                minHeight: isMobile ? '300px' : 'auto', // Altura mínima para o texto
                                zIndex: 2,
                                padding: isMobile ? 2 : 4,
                                order: isMobile ? 1 : 'initial' // Garante que no mobile o texto vem primeiro
                            }}>
                                <Typography
                                    variant={isMobile ? "h5" : "h3"}
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: isMobile ? '1.8rem' : '3rem',
                                        lineHeight: 1.1,
                                        mb: 1,
                                        background: 'linear-gradient(130deg, #C32020 0%, #5D0F0F 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {slide.title}
                                </Typography>

                                <Typography
                                    variant={isMobile ? "h6" : "h4"}
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: isMobile ? '1.5rem' : '2.5rem',
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
                                    sx={{
                                        mb: 3,
                                        color: isMobile ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)',
                                        fontSize: isMobile ? '0.9rem' : '1.1rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {slide.description}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    sx={{
                                        mb: 4,
                                        color: isMobile ? '#C32020' : '#C32020',
                                        fontSize: isMobile ? '1rem' : '1.2rem'
                                    }}
                                >
                                    {slide.extraInfo}
                                </Typography>

                                <Button
                                    variant="contained"
                                    size={isMobile ? "medium" : "large"}
                                    sx={{
                                        background: 'linear-gradient(90deg, #C32020 0%, #5D0F0F 100%)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        borderRadius: '50px',
                                        px: 4,
                                        py: isMobile ? 1 : 1.5,
                                        fontSize: isMobile ? '1rem' : '1.2rem',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#E55A2B',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease',
                                        width: isMobile ? '100%' : '220px',
                                        mb: isMobile ? 2 : 0 // Margem inferior no mobile
                                    }}
                                >
                                    {slide.buttonText}
                                </Button>
                            </Box>

                            {/* Imagem */}
                            <Box sx={{
                                width: isMobile ? '100%' : '35%',
                                height: isMobile ? '250px' : '100%', // Altura fixa no mobile
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                                order: isMobile ? 2 : 'initial'
                            }}>
                                <Box
                                    component="img"
                                    src={slide.img}
                                    alt={slide.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: isMobile ? '250px' : '480px', // Altura máxima no mobile
                                        objectFit: 'cover',
                                        borderRadius: isMobile ? '20px' : '30px',
                                    }}
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/900x600/FF6B35/FFFFFF?text=${encodeURIComponent(slide.title)}`;
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