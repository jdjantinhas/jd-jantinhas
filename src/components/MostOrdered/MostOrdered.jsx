import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../contexts/CartContext';

const MostOrdered = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mostOrdered, isLoading } = useProducts();
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        try {
            // Apenas adicionar ao carrinho - NÃO incrementar contador!
            addToCart({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                imagem: item.imagem
            }, 1);

            // Feedback opcional
            console.log(`${item.nome} adicionado ao carrinho`);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Carregando mais pedidos...</Typography>
            </Box>
        );
    }

    if (mostOrdered.length === 0) {
        return (
            <Box sx={{
                width: '100%',
                mb: 6,
                px: isMobile ? 2 : 4,
                backgroundColor: 'transparent'
            }}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        mb: 4, mt: 2,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        color: '#FFFFFF',
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: isMobile ? '1.8rem' : '2.5rem',
                        paddingLeft: isMobile ? 1 : 0
                    }}
                >
                    Mais Pedidos
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textAlign: 'center',
                        py: 4
                    }}
                >
                    Ainda não há pedidos finalizados. Seja o primeiro a pedir!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            width: '100%',
            mb: 6,
            px: isMobile ? 2 : 2,
            backgroundColor: 'transparent'
        }}>
            <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                    mb: 4, mt: 2,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    paddingLeft: isMobile ? 1 : 0
                }}
            >
                Mais Pedidos
            </Typography>

            <Box sx={{
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <EmblaCarousel
                    showControls={false}
                    options={{
                        loop: false,
                        dragFree: true,
                        containScroll: 'trimSnaps',
                        align: 'start'
                    }}
                >
                    {mostOrdered.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                flex: '0 0 auto',
                                minWidth: isMobile ? 250 : 280,
                                maxWidth: isMobile ? 250 : 280,
                                marginRight: '16px',
                                marginLeft: '10px'
                            }}
                        >
                            <Card sx={{
                                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                                borderRadius: '40px',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                position: 'relative' // Adicionado para referência
                            }}>
                                {/* Container do SVG - AGORA FORA da imagem, no canto superior direito do Card */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: 170,
                                    height: 98,
                                    zIndex: 9, // Garante que fique sobre a imagem
                                    pointerEvents: 'none' // Permite interação com elementos abaixo
                                }}>
                                    {/* SVG como fundo */}
                                    <svg
                                        width="180"
                                        height="90"
                                        viewBox="0 0 48 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <path d="M5.5567 8.5L5.5567 5.5567C5.5567 2.48782 3.06888 0 0 0H18.642H32.2508H39C44.5229 0 49 4.47715 49 10V14V28C49 21.0005 43.3258 15.3263 36.3263 15.3263H32.2508H18.642H12.383C8.61293 15.3263 5.5567 12.27 5.5567 8.5Z" fill="#2C0606" />
                                    </svg>

                                    {/* Preço sobreposto no SVG */}
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            top: '25%',
                                            right: 28,
                                            transform: 'translateY(-50%)',
                                            zIndex: 3,
                                            fontFamily: '"Libre Baskerville", serif',
                                            fontWeight: 'bold',
                                            fontSize: '1.3rem',
                                            color: '#FFFFFF',
                                            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                            lineHeight: 1,
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        R$ {item.preco?.toFixed(2).replace('.', ',') || '00,00'}
                                    </Typography>
                                </Box>

                                {/* Imagem */}
                                <Box sx={{
                                    width: '100%',
                                    height: 170,
                                    position: 'relative'
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={item.imagem}
                                        alt={item.nome}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Box>

                                {/* Conteúdo */}
                                <CardContent sx={{
                                    p: 1.5,
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: '"Libre Baskerville", serif',
                                            fontWeight: 'bold',
                                            mb: 0.5,
                                            color: '#FFFFFF',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.nome}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: '"Libre Baskerville", serif',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            mb: 2,
                                            fontSize: '0.9rem',
                                            lineHeight: 1.2,
                                            minHeight: '2.4em'
                                        }}
                                    >
                                        {item.descricao}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<AddIcon />}
                                        onClick={() => handleAddToCart(item)}
                                        sx={{
                                            fontFamily: '"Libre Baskerville", serif',
                                            backgroundColor: '#AF1D1D',
                                            color: 'white',
                                            borderRadius: '30px',
                                            padding: '8px 16px',
                                            fontSize: '0.9rem',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            mt: 'auto', mb: 0,
                                            '&:hover': {
                                                backgroundColor: '#8a1818',
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </EmblaCarousel>
            </Box>
        </Box>
    );
};

export default MostOrdered;