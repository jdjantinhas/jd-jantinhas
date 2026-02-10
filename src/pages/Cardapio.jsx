import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Container
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CardItem from '../components/Cards/CardItem.jsx';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../hooks/useProducts';

// Componente para o carrossel de categorias
const CategoriesCarousel = ({ categories, scrollToSection }) => {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
            window.addEventListener('resize', checkScrollPosition);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
            }
        };
    }, []);

    return (
        <Box sx={{
            position: 'relative',
            mb: { xs: 4, md: 6 },
            px: { xs: 0, sm: 2 }
        }}>
            {showLeftArrow && (
                <IconButton
                    onClick={scrollLeft}
                    sx={{
                        position: 'absolute',
                        left: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        backgroundColor: '#AF1D1D',
                        color: 'white',
                        display: { xs: 'flex', md: 'none' },
                        '&:hover': {
                            backgroundColor: '#8a1818'
                        },
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        '&:active': {
                            transform: 'translateY(-50%)',
                        }
                    }}
                >
                    <ChevronLeftIcon fontSize="small" />
                </IconButton>
            )}

            {showRightArrow && (
                <IconButton
                    onClick={scrollRight}
                    sx={{
                        position: 'absolute',
                        right: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        backgroundColor: '#AF1D1D',
                        color: 'white',
                        display: { xs: 'flex', md: 'none' },
                        '&:hover': {
                            backgroundColor: '#8a1818'
                        },
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        '&:active': {
                            transform: 'translateY(-50%)',
                        }
                    }}
                >
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            )}

            <Box
                ref={scrollContainerRef}
                sx={{
                    display: 'flex',
                    overflowX: { xs: 'auto', md: 'visible' },
                    overflowY: 'hidden',
                    gap: { xs: 1.5, sm: 2 },
                    pb: 1,
                    px: { xs: 2, sm: 0 },
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    msOverflowStyle: 'none',
                }}
            >
                {categories.map((categoria) => (
                    <Chip
                        key={categoria.id}
                        icon={categoria.icone}
                        label={categoria.nome}
                        onClick={() => scrollToSection(categoria.id)}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                            padding: { xs: '6px 12px', md: '8px 16px' },
                            height: 'auto',
                            minHeight: { xs: '36px', md: '48px' },
                            backgroundColor: '#200404',
                            color: 'white',
                            borderRadius: '24px',
                            '& .MuiChip-icon': {
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                marginLeft: { xs: '6px', md: '8px' }
                            },
                            '&:hover': {
                                backgroundColor: '#8a1818',
                                boxShadow: '0 4px 12px rgba(175, 29, 29, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '1px solid rgba(175, 29, 29, 0.3)',
                            flexShrink: 0,
                            minWidth: { xs: '120px', sm: '140px', md: '160px' }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

const Cardapio = () => {
    const { addToCart } = useCart();
    const {
        categories,
        getProductsByCategory,
        isLoading
    } = useProducts();

    // Criar refs para cada seção
    const sectionRefs = useRef({});

    // Mapeamento de ícones
    const iconMap = {
        RestaurantIcon: <RestaurantIcon />,
        LocalCafeIcon: <LocalCafeIcon />,
        LocalBarIcon: <LocalBarIcon />
    };

    // Preparar categorias com ícones e refs
    const categoriesWithIcons = useMemo(() => {
        if (!categories || categories.length === 0) return [];

        return categories.map(category => {
            // Inicializar ref para esta categoria se não existir
            if (!sectionRefs.current[category.id]) {
                sectionRefs.current[category.id] = React.createRef();
            }

            return {
                ...category,
                icone: iconMap[category.icone] || <RestaurantIcon />,
                ref: sectionRefs.current[category.id]
            };
        });
    }, [categories]);

    const scrollToSection = (categoryId) => {
        const ref = sectionRefs.current[categoryId];
        if (ref?.current) {
            const offset = 80; // Ajuste para header fixo
            const elementTop = ref.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth'
            });
        }
    };

    const handleAddToCart = (item) => {
        try {
            addToCart({
                id: item.id,
                nome: item.nome,
                preco: parseFloat(item.preco), // Converter para número
                imagem: item.imagem || item.imageUrl
            }, 1);

            console.log('Item adicionado:', item.nome);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    const renderSection = (category) => {
        const produtos = getProductsByCategory(category.id);

        if (!produtos || produtos.length === 0) {
            return null;
        }

        return (
            <Box
                key={category.id}
                ref={sectionRefs.current[category.id]}
                sx={{
                    mb: { xs: 6, md: 8 },
                    scrollMarginTop: '80px' // Para o scroll suave
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    {/* Barra lateral */}
                    <Box
                        sx={{
                            width: 6,
                            height: 42,
                            background: 'linear-gradient(180deg, #AF1D1D 0%, #FFD700 100%)',
                            borderRadius: 2,
                            mr: 1.5,
                        }}
                    />

                    {/* Título */}
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' },
                                fontWeight: 700,
                                color: '#fff',
                                lineHeight: 1.1,
                                letterSpacing: '0.4px',
                            }}
                        >
                            {category.nome}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: '0.8rem',
                                fontStyle: 'italic',
                                mt: 0.25,
                            }}
                        >
                            Conheça nossa seleção especial
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(auto-fill, minmax(280px, 1fr))',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'stretch'
                }}>
                    {produtos.map((item) => (
                        <CardItem
                            key={item.id}
                            item={{
                                ...item,
                                imageUrl: item.imagem || item.imageUrl,
                                preco: item.preco,
                                nome: item.nome,
                                descricao: item.descricao
                            }}
                            onAddToCart={() => handleAddToCart(item)}
                        />
                    ))}
                </Box>
            </Box>
        );
    };

    if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{
                py: { xs: 3, md: 4 },
                px: { xs: 2, sm: 3, md: 4 },
                textAlign: 'center',
                color: 'white'
            }}>
                <Typography>Carregando cardápio...</Typography>
            </Container>
        );
    }

    return (
        <Box maxWidth="xl" sx={{
            py: { xs: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 }
        }}>
            {/* Cabeçalho */}
            <Box sx={{
                mb: { xs: 4, md: 6 },
                textAlign: { xs: 'center', sm: 'left' }
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 700,
                        color: '#AF1D1D',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                        mb: 2
                    }}
                >
                    Cardápio
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: { xs: '0.95rem', md: '1.1rem' },
                        maxWidth: '600px',
                        mx: { xs: 'auto', sm: 0 }
                    }}
                >
                    Explore nosso menu completo. Clique nas categorias para navegar rapidamente.
                </Typography>
            </Box>

            {/* Carrossel de categorias */}
            <CategoriesCarousel
                categories={categoriesWithIcons}
                scrollToSection={scrollToSection}
            />

            {/* Seções do menu */}
            {categories.map(category => renderSection(category))}
        </Box>
    );
};

export default Cardapio;