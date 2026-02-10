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
                                marginRight: '24px'
                            }}
                        >
                            <Card sx={{
                                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                                border: '2px solid #230F0F',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 25px rgba(175, 29, 29, 0.3)',
                                }
                            }}>
                                {/* Imagem */}
                                <Box sx={{
                                    width: '100%',
                                    height: 160,
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

                                    {/* Preço */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        backgroundColor: '#AF1D1D',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontFamily: '"Libre Baskerville", serif',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                                    }}>
                                        R$ {item.preco?.toFixed(2).replace('.', ',') || '00,00'}
                                    </Box>
                                </Box>

                                {/* Conteúdo */}
                                <CardContent sx={{
                                    p: 2.5,
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
                                            lineHeight: 1.2
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
                                            borderRadius: '15px',
                                            padding: '8px 16px',
                                            fontSize: '0.9rem',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            mt: 'auto',
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