import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';

const HorizontalScrollCarousel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const slides = [
        {
            id: 1,
            title: 'O Combo Perfeito',
            subtitle: 'Jantinha + Espetinho',
            description: 'Jantinha completa acompanhada de um espetinho suculento, feita na hora e no ponto certo. Sabor caseiro, porção caprichada e aquele gostinho que dá vontade de repetir.',
            extraInfo: 'Variadas opções de espetinhos!',
            buttonText: 'Peça agora',
            img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 2,
            title: 'Sobremesa Especial',
            subtitle: 'Sorvete Artesanal',
            description: 'Sorvete cremoso feito com ingredientes selecionados, perfeito para finalizar sua refeição. Diversos sabores exclusivos para você escolher.',
            extraInfo: 'Novos sabores toda semana!',
            buttonText: 'Experimente',
            img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 3,
            title: 'Promoção do Dia',
            subtitle: '2 por 1',
            description: 'Aproveite nossa promoção especial: leve dois pratos pelo preço de um. Todas as sextas-feiras, das 18h às 22h.',
            extraInfo: 'Válido apenas para delivery!',
            buttonText: 'Aproveitar',
            img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80'
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
            boxShadow: 3,
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
                        height: 'auto', // Altura automática
                        position: 'relative'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            height: isMobile ? 'auto' : '520px', // Altura automática no mobile
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: isMobile ? 2 : 4,
                            padding: isMobile ? 3 : 5
                        }}>
                            {/* Conteúdo de texto */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: isMobile ? '100%' : '45%',
                                height: isMobile ? 'auto' : '100%', // Altura automática no mobile
                                minHeight: isMobile ? '300px' : 'auto', // Altura mínima para o texto
                                zIndex: 2,
                                padding: isMobile ? 2 : 0,
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
                                width: isMobile ? '100%' : '55%',
                                height: isMobile ? '250px' : '100%', // Altura fixa no mobile
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                                order: isMobile ? 2 : 'initial' // Garante que no mobile a imagem vem depois
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
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
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