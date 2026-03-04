import { Box, Typography, Button, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import { Tag, Store } from 'lucide-react';
import AddIcon from '@mui/icons-material/Add';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../contexts/CartContext';
import { motion } from "framer-motion";

const MostOrdered = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mostOrdered, isLoading } = useProducts();
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        try {
            addToCart({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                imagem: item.imagem
            }, 1);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="white">Carregando mais pedidos...</Typography>
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
                    component="h2"
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
                    color="text.secondary"
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
            px: isMobile ? 2 : 6,
            backgroundColor: 'transparent'
        }}>
            {/* Container flex para título e delivery apps */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                mt: 2
            }}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: isMobile ? '1.8rem' : '2.5rem',
                    }}
                >
                    Mais Pedidos
                </Typography>

                {/* Delivery Apps - apenas para desktop */}
                {!isMobile && (
                    <Box
                        component={motion.div}
                        initial={{ backgroundPosition: "0% 50%" }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            padding: '8px 14px',
                            borderRadius: '50px',
                            background: 'linear-gradient(270deg, #2C0606, #110A09, #3A0B0B)',
                            backgroundSize: '300% 300%'
                        }}
                    >
                        <Tag size={18} color="#fff" />

                        <Typography
                            variant="caption"
                            component="span"
                            sx={{
                                color: '#fff',
                                fontFamily: '"Inter", sans-serif',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                lineHeight: 1
                            }}
                        >
                            Entrega Delivery
                        </Typography>

                        <Button
                            aria-label='99 Food'
                            variant="contained"
                            startIcon={<Store size={16} />}
                            sx={{
                                backgroundColor: '#FFDD00',
                                color: '#000000',
                                borderRadius: '50px',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '14px',
                                px: 2,
                                '&:hover': {
                                    backgroundColor: '#e6c800',
                                },
                            }}
                            onClick={() => window.open('https://www.99food.com.br/', '_blank')}
                        >
                            99Food
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<Store size={18} />}
                            sx={{
                                backgroundColor: '#AA101A',
                                color: '#ffffff',
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '12px',
                                py: 1,
                                px: 2,
                            }}
                            onClick={() => window.open('https://www.ifood.com.br/', '_blank')}
                        >
                            iFood
                        </Button>
                    </Box>
                )}
            </Box>

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
                    {mostOrdered.map((item) => {
                        const imageName = item.imagem.split('/').pop().split('.')[0];
                        // O src agora aponta para a versão otimizada padrão (800w) no diretório otimizado
                        const optimizedSrc = `${imageName}-800w.webp`;
                        // O srcset lista todas as versões otimizadas
                        const srcSet = [
                            `${imageName}-320w.webp 320w`,
                            `${imageName}-480w.webp 480w`,
                            `${imageName}-800w.webp 800w`,
                            `${imageName}-1200w.webp 1200w`,
                            `${imageName}-1600w.webp 1600w`,
                        ].join(', ');

                        return (
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
                                    borderRadius: '20px',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    height: isMobile ? 360 : 380,
                                    width: '100%',
                                    overflow: 'hidden'
                                }}>
                                    {/* Container do SVG do Preço - MANTIDO DESIGN ORIGINAL */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: 170,
                                        height: 98,
                                        zIndex: 9,
                                        pointerEvents: 'none'
                                    }}>
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

                                    <CardMedia
                                        component="img"
                                        src={optimizedSrc}
                                        srcSet={srcSet}
                                        sizes="(max-width: 600px) 250px, 280px"
                                        sx={{
                                            height: 200,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '20px',
                                            borderTopRightRadius: '20px',
                                            position: 'relative',
                                            zIndex: 8,
                                        }}
                                        alt={item.nome}
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontFamily: '"Libre Baskerville", serif',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                mb: 1,
                                                lineHeight: 1.2,
                                                height: 40,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {item.nome}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontFamily: '"Inter", sans-serif',
                                                fontSize: '0.85rem',
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                height: 60,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {item.descricao}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ p: '16px', pt: 0 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            sx={{
                                                backgroundColor: '#AA101A',
                                                color: 'white',
                                                borderRadius: '20px',
                                                width: '100%',
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#8B0C14',
                                                },
                                            }}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Adicionar
                                        </Button>
                                    </Box>
                                </Card>
                            </Box>
                        );
                    })}
                </EmblaCarousel>
            </Box>
        </Box>
    );
};

export default MostOrdered;