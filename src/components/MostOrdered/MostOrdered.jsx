import { Box, Typography, Button, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { Tag, Store } from 'lucide-react';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../contexts/CartContext';
import { motion } from "framer-motion";

// 1. Otimização: Keyframes CSS para animação de gradiente (evita Reflow do JS)
const gradientAnimation = {
    '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    }
};

const MostOrdered = () => {
    const { mostOrdered, isLoading } = useProducts();
    const { addToCart } = useCart();

    if (isLoading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="white">Carregando mais pedidos...</Typography>
            </Box>
        );
    }

    if (mostOrdered.length === 0) {
        return (
            <Box sx={{ width: '100%', mb: 6, px: { xs: 2, sm: 4 }, backgroundColor: 'transparent' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        mb: 4, mt: 2,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '1.8rem', sm: '2.5rem' }
                    }}
                >
                    Mais Pedidos
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', py: 4 }}>
                    Ainda não há pedidos finalizados. Seja o primeiro a pedir!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', mb: 6, px: { xs: 2, sm: 6 }, backgroundColor: 'transparent', ...gradientAnimation }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '1.8rem', sm: '2.5rem' },
                    }}
                >
                    Mais Pedidos
                </Typography>

                {/* 2. Otimização: Esconder via CSS (display: none) em vez de JS condicional */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 1,
                        padding: '8px 14px',
                        borderRadius: '50px',
                        background: 'linear-gradient(270deg, #2C0606, #110A09, #3A0B0B)',
                        backgroundSize: '300% 300%',
                        animation: 'gradient 8s ease infinite', // Animação via CSS puro
                        willChange: 'background-position'
                    }}
                >
                    <Tag size={18} color="#fff" />
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, textTransform: 'uppercase' }}>
                        Entrega Delivery
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Store size={16} />}
                        sx={{ backgroundColor: '#FFDD00', color: '#000', borderRadius: '50px', fontWeight: 600 }}
                        onClick={() => window.open('https://www.99food.com.br/', '_blank')}
                    >
                        99Food
                    </Button>
                </Box>
            </Box>

            <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                <EmblaCarousel
                    showControls={false}
                    options={{ loop: false, dragFree: true, containScroll: 'trimSnaps', align: 'start' }}
                >
                    {mostOrdered.map((item) => {
                        const imageName = item.imagem.split('/').pop().split('.')[0].toLowerCase().replace(/\s+/g, '');
                        const srcSet = [
                            `/img/img/optimized/${imageName}-320w.webp 320w`,
                            `/img/img/optimized/${imageName}-480w.webp 480w`,
                            `/img/img/optimized/${imageName}-800w.webp 800w`,
                            `/img/img/optimized/${imageName}-1200w.webp 1200w`,
                            `/img/img/optimized/${imageName}-1600w.webp 1600w`,
                        ].join(', ');

                        return (
                            <Box
                                key={item.id}
                                sx={{
                                    flex: '0 0 auto',
                                    // 3. Otimização: Largura fixa via Breakpoints CSS
                                    width: { xs: '250px', sm: '280px' },
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
                                    position: 'relative',
                                    // 4. Otimização: Altura fixa via CSS para evitar saltos (CLS)
                                    height: { xs: '360px', sm: '380px' },
                                    width: '100%',
                                    overflow: 'hidden'
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={`/img/img/optimized/${imageName}-800w.webp`}
                                        srcSet={srcSet}
                                        alt={item.nome}
                                        sx={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            // 5. Otimização: Aspect-ratio ajuda o navegador a reservar o espaço
                                            aspectRatio: '16/9'
                                        }}
                                        loading="lazy"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.nome}</Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            R$ {item.preco.toFixed(2).replace('.', ',')}
                                        </Typography>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={() => addToCart(item, 1)}
                                            sx={{ mt: 2, backgroundColor: '#AA101A', borderRadius: '10px' }}
                                        >
                                            Adicionar
                                        </Button>
                                    </CardContent>
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
