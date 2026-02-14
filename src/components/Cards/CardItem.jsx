import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const CardItem = ({ item, onAddToCart }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Verificar se tem variantes
    const hasVariants = item.variantes && item.variantes.length > 0;

    // SVG de fundo para os cards
    const CardBackgroundSVG = () => (
        <Box
            sx={{
                position: 'absolute',
                top: '20%', // Começa depois da imagem circular
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                borderRadius: '40px',
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1125 1400"
                preserveAspectRatio="none"
                fill="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            >
                <path
                    d="M0 206.252L770.901 64.9188C955.18 31.134 1125 172.65 1125 360.001V1151H0V206.252Z"
                    fill="#A4040D"
                    fillOpacity={0.9}
                />
                <path
                    d="M0 257.963L773.774 123.868C957.205 92.0789 1125 233.296 1125 419.462V1151H0V257.963Z"
                    fill="#0A0403"
                    fillOpacity={0.95}
                />
            </svg>
        </Box>
    );

    // Imagem circular para o topo (30%)
    const CircularImage = () => (
        <Box
            sx={{
                position: 'relative',
                width: {
                    xs: '120px',
                    sm: '140px',
                    md: '180px'
                },
                height: {
                    xs: '120px',
                    sm: '140px',
                    md: '180px'
                },
                borderRadius: '38%',
                overflow: 'hidden',
                margin: '0 auto',
                backgroundColor: '#000'
            }}
        >
            <CardMedia
                component="img"
                image={item.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop"}
                alt={item.nome}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </Box>
    );

    // Layout para mobile
    if (isMobile) {
        return (
            <Card sx={{
                width: '100%',
                minHeight: '400px',
                background: 'transparent',
                border: '2px solid rgba(175, 29, 29, 0.3)',
                borderRadius: '40px',
                overflow: 'hidden',
                color: 'white',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',

            }}>
                {/* Fundo SVG (70%) */}
                <CardBackgroundSVG />

                {/* Conteúdo sobre o SVG */}
                <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 2
                }}>
                    {/* TÍTULO ACIMA */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                lineHeight: 1.2
                            }}
                        >
                            {item.nome}
                        </Typography>
                    </Box>

                    {/* IMAGEM NA POSIÇÃO ATUAL */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                    }}>
                        <CircularImage />
                    </Box>

                    {/* Badge para produtos com variantes */}
                    {hasVariants && (
                        <Box sx={{
                            backgroundColor: '#AF1D1D',
                            color: '#FFFFFF',
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            textAlign: 'center',
                            width: 'fit-content',
                            mx: 'auto',
                            mb: 0,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}>
                            ESCOLHA O SABOR
                        </Box>
                    )}

                    {/* DESCRIÇÃO ABAIXO DA IMAGEM */}
                    <Box sx={{ flex: 1, mb: 0 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255, 255, 255, 0.8)',
                                textAlign: 'center',
                                fontSize: '0.8rem',
                                lineHeight: 1.3,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontStyle: hasVariants ? 'italic' : 'normal'
                            }}
                        >
                            {hasVariants ? 'Clique para escolher o sabor!' : item.descricao}
                        </Typography>
                    </Box>

                    {/* Preço */}
                    <Box sx={{
                        textAlign: 'center',
                        mb: 2
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.8rem',
                                mb: 0.5
                            }}
                        >
                            {hasVariants ? 'Preço por unidade:' : 'Preço:'}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: '#FFFFFF',
                                fontSize: '1.3rem'
                            }}
                        >
                            R$ {item.preco?.toFixed(2) || '00,00'}
                        </Typography>
                    </Box>

                    {/* Botão */}
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
                        {hasVariants ? 'Escolher Sabor' : 'Adicionar'}
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
                minHeight: '400px',
                background: 'transparent',
                border: '2px solid rgba(175, 29, 29, 0.3)',
                borderRadius: '40px',
                overflow: 'hidden',
                color: 'white',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(175, 29, 29, 0.3)',
                }
            }}>
                {/* Fundo SVG (70%) */}
                <CardBackgroundSVG />

                {/* Conteúdo sobre o SVG */}
                <CardContent sx={{
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 3
                }}>
                    {/* TÍTULO ACIMA */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: '1.2rem',
                                lineHeight: 1.3
                            }}
                        >
                            {item.nome}
                        </Typography>
                    </Box>

                    {/* IMAGEM NA POSIÇÃO ATUAL */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <CircularImage />
                    </Box>

                    {/* Badge para produtos com variantes */}
                    {hasVariants && (
                        <Box sx={{
                            backgroundColor: '#AF1D1D',
                            color: '#FFFFFF',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            width: 'fit-content',
                            mx: 'auto',
                            mb: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}>
                            ESCOLHA O SABOR
                        </Box>
                    )}

                    {/* DESCRIÇÃO ABAIXO DA IMAGEM */}
                    <Box sx={{ flex: 1, mb: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255, 255, 255, 0.8)',
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontStyle: hasVariants ? 'italic' : 'normal'
                            }}
                        >
                            {hasVariants ? 'Clique para escolher o sabor do seu espetinho!' : item.descricao}
                        </Typography>
                    </Box>

                    {/* Preço */}
                    <Box sx={{
                        textAlign: 'center',
                        mb: 2
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.85rem',
                                mb: 0.5
                            }}
                        >
                            {hasVariants ? 'Preço por sabor:' : 'Preço:'}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: '#FFFFFF',
                                fontSize: '1.4rem'
                            }}
                        >
                            R$ {item.preco?.toFixed(2) || '00,00'}
                        </Typography>
                    </Box>

                    {/* Botão */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => onAddToCart(item)}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            background: 'linear-gradient(135deg, #AF1D1D 0%, #8a1818 100%)',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '10px 24px',
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #8a1818 0%, #AF1D1D 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 15px rgba(175, 29, 29, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {hasVariants ? 'Escolher' : 'Adicionar'}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // Layout para desktop
    return (
        <Card sx={{
            width: '100%',
            maxWidth: 350,
            minHeight: '500px',
            background: 'transparent',
            border: '1px solid #121212',
            borderRadius: '40px',
            overflow: 'hidden',
            color: 'white',
            transition: 'all 0.3s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Fundo SVG (70%) */}
            <CardBackgroundSVG />

            {/* Conteúdo sobre o SVG */}
            <Box sx={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 4
            }}>
                {/* TÍTULO ACIMA */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: '1.4rem',
                            lineHeight: 1.3
                        }}
                    >
                        {item.nome}
                    </Typography>
                </Box>

                {/* IMAGEM NA POSIÇÃO ATUAL */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3
                }}>
                    <CircularImage />
                </Box>

                {/* Badge para produtos com variantes */}
                {hasVariants && (
                    <Box sx={{
                        backgroundColor: '#AF1D1D',
                        color: '#FFFFFF',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontFamily: '"Libre Baskerville", serif',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        width: 'fit-content',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        letterSpacing: '0.5px'
                    }}>
                        ESCOLHA O SABOR
                    </Box>
                )}

                {/* DESCRIÇÃO ABAIXO DA IMAGEM */}
                <Box sx={{ flex: 1, mb: 3 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            fontSize: '0.95rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontStyle: hasVariants ? 'italic' : 'normal'
                        }}
                    >
                        {hasVariants ? 'Clique para escolher entre nossos deliciosos sabores de espetinho!' : item.descricao}
                    </Typography>
                </Box>

                {/* Preço */}
                <Box sx={{
                    textAlign: 'center',
                    mb: 3
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.9rem',
                            mb: 0.5
                        }}
                    >
                        {hasVariants ? 'Preço por unidade:' : 'Preço:'}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            fontSize: '1.5rem'
                        }}
                    >
                        R$ {item.preco?.toFixed(2) || '00,00'}
                    </Typography>
                </Box>

                {/* Botão */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => onAddToCart(item)}
                    fullWidth
                    sx={{
                        fontFamily: '"Inter", serif',
                        background: 'linear-gradient(135deg, #AF1D1D 0%, #8a1818 100%)',
                        color: 'white',
                        borderRadius: '50px',
                        padding: '10px',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(175, 29, 29, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #8a1818 0%, #AF1D1D 100%)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 20px rgba(175, 29, 29, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {hasVariants ? 'Escolher Sabor' : 'Adicionar ao Carrinho'}
                </Button>
            </Box>
        </Card>
    );
};

export default CardItem;