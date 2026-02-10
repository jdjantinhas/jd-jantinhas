import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    DialogContentText,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TableBarIcon from '@mui/icons-material/TableBar';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useCart } from '../../contexts/CartContext';
import logoJDJantinhas from '../../assets/svg/jd-logo-horizontal.svg';

// Import do Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openQrModal, setOpenQrModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { getTotalItems, tableNumber } = useCart();

    const menuItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'cardapio', label: 'Cardápio', path: '/cardapio' },
        { id: 'sobre', label: 'Sobre Nós', path: '/sobre' },
        { id: 'contato', label: 'Contato', path: '/contato' },
    ];

    // Animação de entrada ao carregar a página
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // VERIFICA SE ESTÁ EM ROTA DE MESA E DEFINE AUTOMATICAMENTE
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/mesa/')) {
            const mesaId = path.split('/mesa/')[1];
            if (mesaId && mesaId.match(/^\d+$/)) {
                console.log(`Mesa ${mesaId} detectada na URL`);
            }
        }
    }, [location]);

    const handleItemClick = (itemId, path) => {
        // Se tentar acessar outras páginas sem mesa, mostra modal
        if (!tableNumber && path !== '/' && !path.startsWith('/mesa/')) {
            setOpenQrModal(true);
            return;
        }

        setActiveItem(itemId);
        navigate(path);
        setMobileOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // REDIRECIONA PARA MESA SE TENTAR ACESSAR CARRINHO SEM MESA
    const handleCartClick = () => {
        if (!tableNumber) {
            setOpenQrModal(true);
            return;
        }
        navigate('/carrinho');
        setActiveItem('carrinho');
    };

    const handleCloseQrModal = () => {
        setOpenQrModal(false);
    };

    const handleScanQRCode = () => {
        setOpenQrModal(false);
        navigate('/');
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.find(item => item.path === currentPath);
        if (currentItem) {
            setActiveItem(currentItem.id);
        } else if (currentPath === '/') {
            setActiveItem('home');
        } else if (currentPath.startsWith('/mesa/')) {
            setActiveItem('cardapio'); // Define como cardápio quando em rota de mesa
        }
    }, [location]);

    // Variantes de animação para Framer Motion
    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
            }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3,
                duration: 0.5
            }
        }
    };

    const tableBadgeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const menuItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1 + 0.5,
                duration: 0.4,
                ease: "easeOut"
            }
        }),
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    const cartVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const drawerVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        },
        exit: {
            x: '100%',
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    const modalVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    const drawerContent = (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            style={{ height: '100%' }}
        >
            <Box sx={{ width: 280, height: '100%', backgroundColor: '#0a0a0a' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: '#fff',
                            }}
                        >
                            Menu
                        </Typography>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
                            <CloseIcon />
                        </IconButton>
                    </motion.div>
                </Box>

                {tableNumber && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                background: 'linear-gradient(135deg, rgba(175, 29, 29, 0.3), rgba(124, 15, 15, 0.3))',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            <TableBarIcon fontSize="small" />
                            <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
                                Você está na <strong>Mesa {tableNumber}</strong>
                            </Typography>
                        </Box>
                    </motion.div>
                )}

                <List>
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                        >
                            <ListItem
                                onClick={() => handleItemClick(item.id, item.path)}
                                sx={{
                                    cursor: 'pointer',
                                    backgroundColor: activeItem === item.id ? 'rgba(175, 29, 29, 0.3)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                    py: 2,
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontFamily: '"Libre Baskerville", serif',
                                        fontSize: '18px',
                                        color: activeItem === item.id ? '#fff' : 'rgba(255,255,255,0.8)',
                                        fontWeight: activeItem === item.id ? 'bold' : 'normal',
                                    }}
                                />
                            </ListItem>
                        </motion.div>
                    ))}
                </List>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <Box sx={{ p: 3, position: 'absolute', bottom: 0, width: '100%' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={handleCartClick}
                            sx={{
                                backgroundColor: 'rgba(175, 29, 29)',
                                fontFamily: '"Libre Baskerville", serif',
                                borderRadius: '50px',
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(175, 29, 29, 0.8)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <span>Carrinho</span>
                                <Badge
                                    badgeContent={getTotalItems()}
                                    color="error"
                                    sx={{ '& .MuiBadge-badge': { backgroundColor: '#FF4444' } }}
                                />
                            </Box>
                        </Button>
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );

    return (
        <>
            <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={headerVariants}
                style={{ position: 'fixed', width: '100%', zIndex: 1300 }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        background: 'transparent',
                        backdropFilter: 'blur(40px)',
                        color: '#fff',
                        fontFamily: '"Libre Baskerville", serif',
                        zIndex: 1300,
                    }}
                >
                    <Toolbar sx={{
                        justifyContent: 'space-between',
                        fontFamily: 'inherit',
                        py: 1,
                    }}>
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <motion.div
                                variants={logoVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontFamily: '"Libre Baskerville", serif',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '20px', md: '24px' },
                                        cursor: 'pointer',
                                        color: '#fff',
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    <img
                                        src={logoJDJantinhas}
                                        alt="JD Jantinhas"
                                        style={{ height: '36px', marginTop: '8px' }}
                                    />
                                </Typography>
                            </motion.div>

                            {tableNumber && (
                                <motion.div
                                    variants={tableBadgeVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Box
                                        sx={{
                                            ml: 2,
                                            px: '24px',
                                            py: '6px',
                                            borderRadius: '20px',
                                            backgroundColor: 'transparent',
                                            border: '2px solid rgba(255,255,255,0.2)',
                                            fontFamily: '"Inter", sans-serif',
                                            display: { xs: 'none', sm: 'flex' },
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            color: '#fff',
                                            backdropFilter: 'blur(6px)',
                                        }}
                                    >
                                        Mesa {tableNumber}
                                    </Box>
                                </motion.div>
                            )}
                        </Box>

                        {/* Menu flutuante para desktop - POSIÇÃO ORIGINAL */}
                        {!isMobile && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontFamily: 'inherit',
                                    backgroundColor: 'rgba(34, 11, 11, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '50px',
                                    padding: '4px',
                                }}
                            >
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        custom={index}
                                        variants={menuItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Button
                                            onClick={() => handleItemClick(item.id, item.path)}
                                            sx={{
                                                fontFamily: '"Libre Baskerville", serif',
                                                textTransform: 'capitalize',
                                                color: activeItem === item.id ? '#fff' : 'rgba(255,255,255,0.8)',
                                                backgroundColor: activeItem === item.id ? 'rgba(175, 29, 29, 0.3)' : 'transparent',
                                                borderRadius: '50px',
                                                padding: '8px 24px',
                                                minWidth: 'auto',
                                                fontSize: '16px',
                                                fontWeight: activeItem === item.id ? 'bold' : 'normal',
                                                '&:hover': {
                                                    backgroundColor: activeItem === item.id
                                                        ? 'rgba(175, 29, 29, 0.4)'
                                                        : 'rgba(255, 255, 255, 0.05)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </motion.div>
                                ))}
                            </Box>
                        )}

                        {/* Botões à direita */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Botão do menu mobile */}
                            {isMobile && (
                                <motion.div
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <IconButton
                                        color="inherit"
                                        aria-label="open menu"
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </motion.div>
                            )}

                            {/* Carrinho */}
                            <motion.div
                                variants={cartVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <IconButton
                                        onClick={handleCartClick}
                                        color="inherit"
                                        aria-label="carrinho"
                                        sx={{
                                            fontFamily: '"Libre Baskerville", serif',
                                            backgroundColor: location.pathname === '/carrinho'
                                                ? 'rgba(175, 29, 29, 0.3)'
                                                : 'rgba(175, 29, 29)',
                                            borderRadius: '50px',
                                            '&:hover': {
                                                backgroundColor: location.pathname === '/carrinho'
                                                    ? 'rgba(175, 29, 29, 0.4)'
                                                    : 'rgba(175, 29, 29, 0.9)',
                                            },
                                            transition: 'all 0.3s ease',
                                            padding: { xs: '8px', md: '10px 20px' },
                                        }}
                                    >
                                        <Badge
                                            badgeContent={getTotalItems()}
                                            color="error"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: '#FF4444',
                                                    fontFamily: 'Arial, sans-serif',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                        {!isMobile && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    ml: 1,
                                                    fontFamily: '"Libre Baskerville", serif',
                                                    textTransform: 'capitalize',
                                                    fontSize: '16px',
                                                    fontWeight: 'medium',
                                                }}
                                            >
                                                Carrinho
                                            </Typography>
                                        )}
                                    </IconButton>
                                </Box>
                            </motion.div>
                        </Box>
                    </Toolbar>
                </AppBar>
            </motion.div>

            {/* Menu lateral para mobile */}
            <AnimatePresence>
                {mobileOpen && (
                    <Drawer
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                backgroundColor: 'transparent',
                                border: 'none',
                                overflow: 'hidden',
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                )}
            </AnimatePresence>

            {/* Modal para solicitar escaneamento do QR Code */}
            <AnimatePresence>
                {openQrModal && (
                    <Dialog
                        open={openQrModal}
                        onClose={handleCloseQrModal}
                        aria-labelledby="qr-code-modal-title"
                        PaperProps={{
                            sx: {
                                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                fontFamily: '"Libre Baskerville", serif',
                                overflow: 'hidden',
                            }
                        }}
                    >
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                        >
                            <DialogTitle
                                id="qr-code-modal-title"
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: '"Libre Baskerville", serif',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                    color: '#fff',
                                    pt: 3,
                                }}
                            >
                                Escaneie o QR Code
                            </DialogTitle>
                            <DialogContent>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    my: 2,
                                }}>
                                    <motion.div
                                        initial={{ rotate: 180, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <QrCodeScannerIcon sx={{
                                            fontSize: 80,
                                            color: '#25D366',
                                            mb: 3,
                                        }} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <DialogContentText sx={{
                                            textAlign: 'center',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            fontSize: '16px',
                                            lineHeight: 1.6,
                                            mb: 2,
                                        }}>
                                            Para acessar o cardápio e fazer pedidos, é necessário escanear o QR Code da sua mesa.
                                        </DialogContentText>

                                        <DialogContentText sx={{
                                            textAlign: 'center',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            fontSize: '14px',
                                            mb: 3,
                                        }}>
                                            Escaneie o código localizado na sua mesa ou peça ajuda a um de nossos atendentes.
                                        </DialogContentText>
                                    </motion.div>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{
                                justifyContent: 'center',
                                pb: 3,
                                px: 3,
                            }}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={handleCloseQrModal}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                            mr: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            }
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={handleScanQRCode}
                                        variant="contained"
                                        startIcon={<QrCodeScannerIcon />}
                                        sx={{
                                            backgroundColor: '#25D366',
                                            color: '#fff',
                                            fontFamily: '"Libre Baskerville", serif',
                                            fontWeight: 'bold',
                                            borderRadius: '50px',
                                            px: 3,
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: '#1DA851',
                                            }
                                        }}
                                    >
                                        Escanear QR Code
                                    </Button>
                                </motion.div>
                            </DialogActions>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>

            {/* Espaçamento para conteúdo abaixo do header fixo */}
            <Toolbar sx={{ minHeight: { xs: '64px', sm: '70px' } }} />
        </>
    );
}