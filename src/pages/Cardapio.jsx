import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Container,
    Fade,
    Paper,
    AppBar,
    Toolbar,
    Button
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CardItem from '../components/Cards/CardItem.jsx';
import ModalVariants from '../components/Modals/ModalVariants';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../hooks/useProducts';

// Componente para o menu fixo de navegação
const FixedNavigation = ({ categories, activeSection, scrollToSection, showFixedMenu }) => {
    if (!showFixedMenu) return null;

    return (
        <Fade in={showFixedMenu}>
            <AppBar
                position="fixed"
                sx={{
                    top: 60,
                    backgroundColor: '#0A0403',
                    borderBottom: '2px solid rgba(175, 29, 29, 0.3)',
                    backdropFilter: 'blur(40px)',
                    zIndex: 1100,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}
            >
                <Toolbar sx={{
                    minHeight: '70px !important',
                    padding: '0 !important',
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        px: 2,
                        py: 0,
                        width: '100%',
                        marginTop: 1,
                        justifyContent: { xs: 'flex-start', md: 'center' }
                    }}>
                        {categories.map((categoria) => (
                            <Button
                                key={categoria.id}
                                onClick={() => scrollToSection(categoria.id)}
                                variant="text"
                                size="small"
                                sx={{
                                    color: activeSection === categoria.id ? '#AF1D1D' : 'white',
                                    backgroundColor: activeSection === categoria.id ? 'rgba(175, 29, 29, 0.1)' : 'transparent',
                                    borderRadius: '20px',
                                    padding: '6px 16px',
                                    fontSize: '0.8rem',
                                    fontWeight: activeSection === categoria.id ? 600 : 400,
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                    minWidth: 'auto',
                                    '&:hover': {
                                        backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.3s ease',
                                    border: activeSection === categoria.id ? '1px solid rgba(175, 29, 29, 0.3)' : '1px solid transparent'
                                }}
                            >
                                {categoria.icone}
                                <Box component="span" sx={{ ml: 1 }}>
                                    {categoria.nome}
                                </Box>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Fade>
    );
};

// Componente para o carrossel de categorias (inicial)
const CategoriesCarousel = ({ categories, scrollToSection, activeSection }) => {
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
                            backgroundColor: activeSection === categoria.id ? '#AF1D1D' : '#200404',
                            color: 'white',
                            borderRadius: '24px',
                            '& .MuiChip-icon': {
                                color: 'white',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                marginLeft: { xs: '6px', md: '8px' }
                            },
                            '&:hover': {
                                backgroundColor: activeSection === categoria.id ? '#8a1818' : '#8a1818',
                                boxShadow: '0 4px 12px rgba(175, 29, 29, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '1px solid #AF1D1D',
                            flexShrink: 0,
                            minWidth: { xs: '120px', sm: '140px', md: '160px' }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

// Botão flutuante para voltar ao topo
const ScrollToTopButton = ({ show }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Fade in={show}>
            <IconButton
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    backgroundColor: '#AF1D1D',
                    color: 'white',
                    zIndex: 1000,
                    width: 56,
                    height: 56,
                    boxShadow: '0 4px 12px rgba(175, 29, 29, 0.4)',
                    '&:hover': {
                        backgroundColor: '#8a1818',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(175, 29, 29, 0.5)'
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
        </Fade>
    );
};

const Cardapio = () => {
    const { addToCart } = useCart();
    const {
        categories,
        getProductsByCategory,
        isLoading
    } = useProducts();

    // Estados para o modal de variantes
    const [modalOpen, setModalOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    // Estados para scroll spy e navegação
    const [activeSection, setActiveSection] = useState('');
    const [showFixedMenu, setShowFixedMenu] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Criar refs para cada seção
    const sectionRefs = useRef({});
    const observerRef = useRef(null);

    // Mapeamento de ícones
    const iconMap = {
        RestaurantIcon: <RestaurantIcon sx={{ fontSize: 18 }} />,
        LocalCafeIcon: <LocalCafeIcon sx={{ fontSize: 18 }} />,
        LocalBarIcon: <LocalBarIcon sx={{ fontSize: 18 }} />
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
                icone: iconMap[category.icone] || <RestaurantIcon sx={{ fontSize: 18 }} />,
                ref: sectionRefs.current[category.id]
            };
        });
    }, [categories]);

    // Configurar Intersection Observer para scroll spy
    useEffect(() => {
        if (categoriesWithIcons.length === 0) return;

        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, options);

        // Observar todas as seções
        categoriesWithIcons.forEach(category => {
            const element = sectionRefs.current[category.id]?.current;
            if (element) {
                element.id = category.id;
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [categoriesWithIcons]);

    // Configurar scroll listener para mostrar/ocultar menu fixo
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Mostrar menu fixo após rolar 300px
            setShowFixedMenu(currentScrollY > 300);

            // Mostrar botão de voltar ao topo após rolar 500px
            setShowScrollToTop(currentScrollY > 500);

            // Controlar direção do scroll (opcional para animações)
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToSection = useCallback((categoryId) => {
        const ref = sectionRefs.current[categoryId];
        if (ref?.current) {
            const offset = 120; // Ajuste considerando header fixo + menu fixo
            const elementTop = ref.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth'
            });
            setActiveSection(categoryId);
        }
    }, []);

    // Função para lidar com adição ao carrinho
    const handleAddToCart = useCallback((item) => {
        // Verificar se o produto tem variantes (sabores)
        if (item.variantes && item.variantes.length > 0) {
            // Abrir modal para seleção da variante
            setProdutoSelecionado(item);
            setModalOpen(true);
        } else {
            // Adicionar diretamente ao carrinho (produto sem variantes)
            try {
                addToCart({
                    id: item.id,
                    nome: item.nome,
                    preco: parseFloat(item.preco),
                    imagem: item.imagem || item.imageUrl
                }, 1);

                console.log('Item adicionado:', item.nome);
            } catch (error) {
                console.error('Erro ao adicionar ao carrinho:', error);
            }
        }
    }, [addToCart]);

    const handleConfirmarVariante = useCallback((produtoComVariante) => {
        try {
            console.log('Produto recebido do modal:', produtoComVariante);

            // Se for um produto variado (múltiplos sabores)
            if (produtoComVariante.ehVariado) {
                // Para produtos variados, adicionamos como um item único com preço total
                addToCart({
                    id: produtoComVariante.id,
                    nome: produtoComVariante.nome,
                    descricao: produtoComVariante.descricao,
                    preco: parseFloat(produtoComVariante.preco),
                    imagem: produtoComVariante.imagem,
                    quantidade: 1,
                    sabores: produtoComVariante.sabores,
                    ehVariado: true,
                    observacao: produtoComVariante.observacao
                });
            } else {
                // Para produto único com variante
                addToCart({
                    id: produtoComVariante.id,
                    nome: produtoComVariante.nome,
                    descricao: produtoComVariante.descricao,
                    preco: parseFloat(produtoComVariante.preco),
                    imagem: produtoComVariante.imagem,
                    varianteNome: produtoComVariante.varianteNome,
                    varianteId: produtoComVariante.varianteId,
                    produtoId: produtoComVariante.produtoId,
                    quantidade: produtoComVariante.quantidade,
                    observacao: produtoComVariante.observacao
                });
            }

            console.log('Item adicionado ao carrinho:', produtoComVariante.nome);
        } catch (error) {
            console.error('Erro ao adicionar variante ao carrinho:', error);
        }
    }, [addToCart]);

    const renderSection = useCallback((category) => {
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
                    scrollMarginTop: '120px', // Ajuste para o menu fixo
                    '&:first-of-type': {
                        mt: { xs: 0, md: 0 }
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    {/* Marcador visual da seção ativa */}
                    <Box
                        sx={{
                            width: activeSection === category.id ? 8 : 6,
                            height: activeSection === category.id ? 46 : 42,
                            background: activeSection === category.id
                                ? 'linear-gradient(180deg, #AF1D1D 0%, #af1d1d 100%)'
                                : 'linear-gradient(180deg, rgba(175, 29, 29, 0.7) 0%, rgba(255, 215, 0, 0.7) 100%)',
                            borderRadius: 2,
                            mr: 1.5,
                            transition: 'all 0.3s ease',
                            boxShadow: activeSection === category.id
                                ? '0 0 10px rgba(175, 29, 29, 0.5)'
                                : 'none'
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
                                color: activeSection === category.id ? '#af1d1d' : '#fff',
                                lineHeight: 1.1,
                                letterSpacing: '0.4px',
                                transition: 'all 0.3s ease',
                                textShadow: activeSection === category.id
                                    ? '0 2px 4px rgba(0,0,0,0.3)'
                                    : 'none'
                            }}
                        >
                            {category.nome}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: activeSection === category.id
                                    ? 'rgba(255, 215, 0, 0.8)'
                                    : 'rgba(255,255,255,0.6)',
                                fontSize: '0.8rem',
                                fontStyle: 'italic',
                                mt: 0.25,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {category.id === 'espetinhos'
                                ? 'Escolha seu sabor favorito!'
                                : 'Conheça nossa seleção especial'}
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
                                descricao: item.descricao,
                                variantes: item.variantes
                            }}
                            onAddToCart={() => handleAddToCart(item)}
                        />
                    ))}
                </Box>
            </Box>
        );
    }, [getProductsByCategory, activeSection, handleAddToCart]);

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
        <>
            {/* Menu fixo de navegação */}
            <FixedNavigation
                categories={categoriesWithIcons}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                showFixedMenu={showFixedMenu}
            />

            <Container maxWidth="xl" sx={{
                py: { xs: 3, md: 4 },
                px: { xs: 2, sm: 3, md: 4 },
                position: 'relative',
                mt: showFixedMenu ? '56px' : 0 // Compensar o espaço do menu fixo
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

                {/* Carrossel de categorias inicial */}
                <CategoriesCarousel
                    categories={categoriesWithIcons}
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                />

                {/* Seções do menu */}
                {categories.map(category => renderSection(category))}

                {/* Modal de Variantes */}
                <ModalVariants
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setProdutoSelecionado(null);
                    }}
                    produto={produtoSelecionado}
                    onConfirm={handleConfirmarVariante}
                />

                {/* Botão flutuante para voltar ao topo */}
                <ScrollToTopButton show={showScrollToTop} />
            </Container>
        </>
    );
};

export default Cardapio;