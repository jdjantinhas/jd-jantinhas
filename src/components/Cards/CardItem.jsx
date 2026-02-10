import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CardItem = ({ item, onAddToCart }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Layout para mobile (dispositivos pequenos)
    if (isMobile) {
        return (
            <Card sx={{
                width: '100%',
                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                border: '2px solid #230F0F',
                borderRadius: '20px',
                overflow: 'hidden',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(175, 29, 29, 0.3)',
                }
            }}>
                {/* Container principal - Layout vertical para mobile */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    gap: 2
                }}>
                    {/* Linha 1: Imagem com preço sobreposto */}
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: 160,
                        borderRadius: '15px',
                        overflow: 'hidden'
                    }}>
                        <CardMedia
                            component="img"
                            image={item.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop"}
                            alt={item.nome}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Preço sobreposto na imagem */}
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
                            fontSize: '1rem',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                        }}>
                            R$ {item.preco?.toFixed(2) || '00,00'}
                        </Box>
                    </Box>

                    {/* Linha 2: Título e Descrição (um abaixo do outro) */}
                    <Box>
                        {/* Título */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif !important',
                                fontWeight: '800',
                                mb: 1,
                                color: '#FFFFFF',
                                fontSize: '1.1rem',
                                lineHeight: 1.3
                            }}
                        >
                            {item.nome}
                        </Typography>

                        {/* Descrição (SEMPRE VISÍVEL EM MOBILE) */}
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255, 255, 255, 0.8)',
                                mb: 2,
                                fontSize: '0.85rem',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '2.8em'
                            }}
                        >
                            {item.descricao}
                        </Typography>
                    </Box>

                    {/* Linha 3: Botão Adicionar */}
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => onAddToCart(item)}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            backgroundColor: '#AF1D1D',
                            color: 'white',
                            borderRadius: '15px',
                            padding: '10px',
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#8a1818',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 5px 15px rgba(175, 29, 29, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </Box>
            </Card>
        );
    }

    // Layout para tablet
    if (isTablet) {
        return (
            <Card sx={{
                width: '100%',
                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                border: '2px solid #230F0F',
                borderRadius: '25px',
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
                    height: 180,
                    flexShrink: 0
                }}>
                    <CardMedia
                        component="img"
                        image={item.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop"}
                        alt={item.nome}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Conteúdo */}
                <CardContent sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                mb: 1.5,
                                color: '#FFFFFF',
                                fontSize: '1.2rem',
                                lineHeight: 1.3
                            }}
                        >
                            {item.nome}
                        </Typography>

                        {/* Descrição para tablet */}
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255, 255, 255, 0.8)',
                                mb: 2,
                                fontSize: '0.9rem',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '4.2em'
                            }}
                        >
                            {item.descricao}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 'auto'
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: '#AF1D1D',
                                fontSize: '1.4rem'
                            }}
                        >
                            R$ {item.preco?.toFixed(2) || '00,00'}
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => onAddToCart(item)}
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                backgroundColor: '#AF1D1D',
                                color: 'white',
                                borderRadius: '20px',
                                padding: '8px 20px',
                                fontSize: '0.9rem',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#8a1818',
                                }
                            }}
                        >
                            Adicionar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    // Layout para desktop (acima de md)
    return (
        <Card sx={{
            width: '100%',
            maxWidth: 320,
            background: 'linear-gradient(145deg, #2C0606, #110A09)',
            border: '2px solid #230F0F',
            borderRadius: '40px',
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
            {/* Imagem com layout responsivo */}
            <Box sx={{
                width: '100%',
                height: 220,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'stretch'
            }}>
                <CardMedia
                    component="img"
                    image={item.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop"}
                    alt={item.nome}
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderBottom: '2px solid #230F0F',
                        borderRadius: '40px 40px 0 0',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </Box>

            {/* Conteúdo do card */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <CardContent sx={{
                    p: 3,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                mb: 1.5,
                                color: '#FFFFFF',
                                fontSize: '1.3rem',
                                lineHeight: 1.3
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
                                fontSize: '0.95rem',
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '4.5em'
                            }}
                        >
                            {item.descricao}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: '#AF1D1D',
                                fontSize: '1.5rem'
                            }}
                        >
                            R$ {item.preco?.toFixed(2) || '00,00'}
                        </Typography>
                    </Box>
                </CardContent>

                <Box sx={{
                    p: 3,
                    pt: 0
                }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => onAddToCart(item)}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            backgroundColor: '#AF1D1D',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '12px 14px',
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: '#8a1818',
                            }
                        }}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default CardItem;