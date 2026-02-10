import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Button,
    Divider,
    IconButton,
    Stack,
    Paper,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TableBarIcon from '@mui/icons-material/TableBar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@mui/material/Card';
import InfoIcon from '@mui/icons-material/Info';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { sendToWhatsApp, generateOrderId } from '../utils/whatsapp';
import CardContent from '@mui/material/CardContent';

const Carrinho = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        checkout,
        getTotalItems,
        tableNumber
    } = useCart();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        console.log('Carrinho: Componente montado. Itens:', cart);
        console.log('Mesa atual:', tableNumber);

        if (!tableNumber) {
            alert('Por favor, escaneie o QR Code da sua mesa primeiro');
            navigate('/');
            return;
        }
    }, [cart, tableNumber, navigate]);

    const handleIncrease = (item) => {
        updateQuantity(item.id, item.quantidade + 1);
    };

    const handleDecrease = (item) => {
        if (item.quantidade > 1) {
            updateQuantity(item.id, item.quantidade - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    const handleBackToMenu = () => {
        navigate('/cardapio');
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleFinalizeOrder = async () => {
        try {
            if (!tableNumber) {
                alert('Mesa não definida. Por favor, escaneie o QR Code da sua mesa.');
                navigate('/');
                return;
            }

            if (cart.length === 0) {
                throw new Error('Carrinho vazio');
            }

            const newOrderId = generateOrderId();
            setOrderId(newOrderId);
            setShowWhatsAppModal(true);

        } catch (error) {
            console.error('Erro ao preparar pedido:', error);
            showSnackbar(`Erro: ${error.message}`, 'error');
        }
    };

    const sendOrderToWhatsApp = () => {
        try {
            const restaurantWhatsApp = '5562982473644';
            const success = sendToWhatsApp(cart, tableNumber, orderId, restaurantWhatsApp);

            if (success) {
                const order = checkout();
                showSnackbar('Pedido enviado com sucesso! Aguarde a confirmação.', 'success');
                setShowWhatsAppModal(false);

                setTimeout(() => {
                    clearCart();
                    navigate('/');
                }, 3000);
            } else {
                showSnackbar('Erro ao abrir WhatsApp. Tente novamente.', 'error');
            }
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            showSnackbar(`Erro: ${error.message}`, 'error');
        }
    };

    // Modal de confirmação do WhatsApp - DESIGN REDESENHADO COM SCROLL
    const WhatsAppModal = () => (
        <Dialog
            open={showWhatsAppModal}
            onClose={() => setShowWhatsAppModal(false)}
            fullScreen={isMobile} // Em mobile, ocupa tela inteira
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : '30px',
                    overflow: 'hidden',
                    backgroundColor: '#1A1A1A',
                    maxWidth: { xs: '100%', sm: '500px' },
                    width: '100%',
                    height: isMobile ? '100vh' : 'auto',
                    maxHeight: isMobile ? '100vh' : '90vh',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    margin: 0
                }
            }}
        >
            {/* Cabeçalho minimalista */}
            <DialogTitle
                sx={{
                    backgroundColor: '#1A1A1A',
                    color: 'white',
                    py: 2,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <WhatsAppIcon sx={{
                        color: '#25D366',
                        fontSize: 28
                    }} />
                    <Box>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: 'white'
                        }}>
                            Confirmar Pedido
                        </Typography>
                        <Typography variant="caption" sx={{
                            color: '#888',
                            fontSize: '0.75rem'
                        }}>
                            ID: {orderId}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={() => setShowWhatsAppModal(false)}
                    size="small"
                    sx={{
                        color: '#888',
                        '&:hover': {
                            backgroundColor: '#2A2A2A',
                            color: 'white'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Conteúdo principal COM SCROLL */}
            <DialogContent sx={{
                backgroundColor: '#1A1A1A',
                py: 3,
                px: 3,
                overflowY: 'auto', // Garante scroll vertical
                maxHeight: isMobile ? 'calc(100vh - 140px)' : '60vh', // Altura responsiva
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#2A2A2A',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#444',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                }
            }}>
                {/* Informação principal */}
                {/* <Box sx={{
                    textAlign: 'center',
                    mb: 3,
                    p: 2,
                    backgroundColor: 'rgba(37, 211, 102, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(37, 211, 102, 0.1)'
                }}>
                    <CheckCircleIcon sx={{
                        color: '#25D366',
                        fontSize: 40,
                        mb: 1
                    }} />
                    <Typography variant="body1" sx={{
                        color: '#25D366',
                        fontWeight: 500,
                        mb: 0.5
                    }}>
                        Pedido pronto para envio
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: '#AAA',
                        fontSize: '0.85rem'
                    }}>
                        Seu pedido será enviado ao restaurante via WhatsApp
                    </Typography>
                </Box> */}

                {/* Detalhes do pedido */}
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: '#252525',
                        borderRadius: '20px',
                        mb: 3,
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="subtitle2" sx={{
                            color: '#888',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: '0.5px',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <ReceiptIcon sx={{ fontSize: 16 }} />
                            Detalhes do Pedido
                        </Typography>

                        <Stack spacing={2}>
                            {/* Mesa */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <TableBarIcon sx={{
                                        color: '#666',
                                        fontSize: 20
                                    }} />
                                    <Typography variant="body2" sx={{ color: '#CCC' }}>
                                        Mesa
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{
                                    color: '#25D366',
                                    fontWeight: 600
                                }}>
                                    {tableNumber}
                                </Typography>
                            </Box>

                            {/* Itens */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <RestaurantIcon sx={{
                                        color: '#666',
                                        fontSize: 20
                                    }} />
                                    <Typography variant="body2" sx={{ color: '#CCC' }}>
                                        Itens
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    textAlign: 'right'
                                }}>
                                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                                </Typography>
                            </Box>

                            {/* Total */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <AttachMoneyIcon sx={{
                                        color: '#AF1D1D',
                                        fontSize: 20
                                    }} />
                                    <Typography variant="body1" sx={{
                                        color: 'white',
                                        fontWeight: 600
                                    }}>
                                        Total
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{
                                    color: '#AF1D1D',
                                    fontWeight: 700,
                                    fontSize: '1.25rem'
                                }}>
                                    R$ {getTotal().toFixed(2)}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Lista de itens (scrollável dentro do card) */}
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: '#252525',
                        borderRadius: '20px',
                        mb: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                        maxHeight: '200px' // Altura máxima para a lista
                    }}
                >
                    <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{
                            p: 2.5,
                            flexShrink: 0
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: '#888',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <FormatListBulletedIcon sx={{ fontSize: 16 }} />
                                Itens do Pedido
                            </Typography>
                        </Box>

                        {/* Container scrollável para os itens */}
                        <Box sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            maxHeight: '150px', // Altura máxima para scroll interno
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#444',
                                borderRadius: '10px',
                            }
                        }}>
                            {cart.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: 1.5,
                                        borderBottom: index < cart.length - 1 ? '1px solid #2A2A2A' : 'none',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}
                                >
                                    <Box sx={{ flex: 1, mr: 2 }}>
                                        <Typography variant="body2" sx={{
                                            color: 'white',
                                            fontWeight: 500,
                                            mb: 0.5,
                                            fontSize: { xs: '0.9rem', sm: '1rem' }
                                        }}>
                                            {item.nome}
                                        </Typography>
                                        <Typography variant="caption" sx={{
                                            color: '#888',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontSize: { xs: '0.75rem', sm: '0.85rem' }
                                        }}>
                                            {item.quantidade}x • R$ {item.preco?.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{
                                        color: '#AF1D1D',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                        fontSize: { xs: '0.9rem', sm: '1rem' }
                                    }}>
                                        R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* Aviso - Fica no final, após a lista */}
                <Box sx={{
                    p: 2,
                    backgroundColor: 'rgba(175, 29, 29, 0.08)',
                    borderRadius: '8px',
                    border: '1px solid rgba(175, 29, 29, 0.2)',
                    mb: 0
                }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                        <WarningIcon sx={{
                            color: '#AF1D1D',
                            fontSize: 18,
                            mt: 0.25,
                            flexShrink: 0
                        }} />
                        <Typography variant="caption" sx={{
                            color: '#AAA',
                            lineHeight: 1.5,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' }
                        }}>
                            O WhatsApp será aberto para envio automático.
                            Confirme a mensagem para finalizar o pedido.
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            {/* Rodapé FIXO - não rola com o conteúdo */}
            <DialogActions sx={{
                backgroundColor: '#1A1A1A',
                py: 2,
                px: 3,
                borderTop: '1px solid #2A2A2A',
                gap: 1.5,
                position: 'sticky',
                bottom: 0,
                zIndex: 1
            }}>
                <Button
                    onClick={() => setShowWhatsAppModal(false)}
                    variant="outlined"
                    sx={{
                        color: '#888',
                        borderColor: '#444',
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        flex: 1,
                        '&:hover': {
                            backgroundColor: '#252525',
                            borderColor: '#666',
                            color: 'white'
                        }
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    startIcon={<WhatsAppIcon sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }} />}
                    onClick={sendOrderToWhatsApp}
                    sx={{
                        backgroundColor: '#25D366',
                        color: 'white',
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        fontWeight: 600,
                        flex: 2,
                        '&:hover': {
                            backgroundColor: '#1DA851',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {isMobile ? 'Enviar' : 'Enviar via WhatsApp'}
                </Button>
            </DialogActions>
        </Dialog>
    );

    // Componente de Item do Carrinho Otimizado para Mobile
    const CartItemMobile = ({ item }) => (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                borderRadius: '20px',
                mb: 2,
                border: '1px solid rgba(175, 29, 29, 0.3)',
                position: 'relative'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Box
                    component="img"
                    src={item.imagem || item.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop"}
                    alt={item.nome}
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '20px',
                        objectFit: 'cover',
                        border: '2px solid #AF1D1D',
                        flexShrink: 0
                    }}
                />

                <IconButton
                    onClick={() => removeFromCart(item.id)}
                    sx={{
                        color: '#FF4444',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                        width: 40,
                        height: 40,
                        '&:hover': {
                            backgroundColor: '#FF4444',
                            color: 'white',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '1.1rem',
                        mb: 1,
                        lineHeight: 1.3
                    }}
                >
                    {item.nome}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        color: '#CCCCCC',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                    }}
                >
                    {item.descricao || 'Descrição não disponível'}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontWeight: 'bold',
                        color: '#AF1D1D',
                        fontSize: '1.2rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                >
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    padding: '4px 8px',
                    border: '1px solid rgba(175, 29, 29, 0.3)'
                }}>
                    <IconButton
                        onClick={() => handleDecrease(item)}
                        size="small"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(175, 29, 29, 0.3)',
                            '&:hover': {
                                backgroundColor: '#AF1D1D'
                            },
                            width: 30,
                            height: 30,
                            minWidth: 30
                        }}
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography
                        sx={{
                            mx: 1.5,
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            color: 'white',
                            minWidth: '25px',
                            textAlign: 'center',
                            fontSize: '1rem'
                        }}
                    >
                        {item.quantidade}
                    </Typography>

                    <IconButton
                        onClick={() => handleIncrease(item)}
                        size="small"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(175, 29, 29, 0.3)',
                            '&:hover': {
                                backgroundColor: '#AF1D1D'
                            },
                            width: 30,
                            height: 30,
                            minWidth: 30
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Typography
                variant="caption"
                sx={{
                    fontFamily: '"Libre Baskerville", serif',
                    color: 'rgba(255, 255, 255, 0.5)',
                    display: 'block',
                    mt: 1,
                    textAlign: 'right',
                    fontSize: '0.75rem'
                }}
            >
                {item.quantidade}x R$ {item.preco?.toFixed(2)} un.
            </Typography>
        </Paper>
    );

    // Componente de Item do Carrinho para Desktop
    const CartItemDesktop = ({ item }) => (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: 'linear-gradient(145deg, #2C0606, #110A09)',
                borderRadius: '30px',
                mb: 2.5,
                border: '1px solid rgba(175, 29, 29, 0.3)',
                position: 'relative',
                '&:hover': {
                    borderColor: 'rgba(175, 29, 29, 0.6)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                }
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16
            }}>
                <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => removeFromCart(item.id)}
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        color: '#FF4444',
                        textTransform: 'none',
                        fontSize: '14px',
                        padding: '8px 16px',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                        borderRadius: '30px',
                        '&:hover': {
                            backgroundColor: '#FF4444',
                            color: 'white'
                        }
                    }}
                >
                    Excluir
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                <Box
                    component="img"
                    src={item.imagem || item.imageUrl}
                    alt={item.nome}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '30px',
                        objectFit: 'cover',
                        border: '2px solid #AF1D1D',
                        flexShrink: 0
                    }}
                />

                <Box sx={{ flex: 1 }}>
                    <Box mb={2}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 'bold',
                                color: 'white',
                                fontSize: '1.3rem',
                                mb: 1
                            }}
                        >
                            {item.nome}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                color: '#CCCCCC',
                                fontSize: '0.95rem',
                                lineHeight: 1.5
                            }}
                        >
                            {item.descricao || 'Descrição não disponível'}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: '"Roboto", sans-serif',
                                    fontWeight: 'bold',
                                    color: '#AF1D1D',
                                    fontSize: '1.3rem'
                                }}
                            >
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontFamily: '"Libre Baskerville", serif',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    display: 'block',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {item.quantidade} × R$ {item.preco?.toFixed(2)} cada
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '30px',
                            padding: '6px 10px',
                            border: '1px solid rgba(175, 29, 29, 0.3)'
                        }}>
                            <IconButton
                                onClick={() => handleDecrease(item)}
                                size="small"
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(175, 29, 29, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#AF1D1D'
                                    },
                                    width: 36,
                                    height: 36
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography
                                sx={{
                                    mx: 2,
                                    fontFamily: '"Libre Baskerville", serif',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    minWidth: '30px',
                                    textAlign: 'center',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {item.quantidade}
                            </Typography>

                            <IconButton
                                onClick={() => handleIncrease(item)}
                                size="small"
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(175, 29, 29, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#AF1D1D'
                                    },
                                    width: 36,
                                    height: 36
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );

    // Carrinho vazio
    if (cart.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ py: 6 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        background: 'linear-gradient(145deg, #2C0606, #110A09)',
                        borderRadius: '30px',
                        border: '2px solid rgba(175, 29, 29, 0.3)'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 'bold',
                            mb: 3,
                            color: '#AF1D1D',
                            fontSize: { xs: '1.8rem', sm: '2.2rem' }
                        }}
                    >
                        Seu carrinho está vazio
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: '#CCCCCC',
                            mb: 4,
                            fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                    >
                        Adicione itens deliciosos do nosso cardápio!
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleBackToMenu}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            backgroundColor: '#AF1D1D',
                            color: 'white',
                            fontFamily: '"Libre Baskerville", serif',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            py: { xs: 1.5, sm: 2 },
                            px: { xs: 3, sm: 4 },
                            borderRadius: '25px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#8a1818',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(175, 29, 29, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Voltar ao Cardápio
                    </Button>
                </Paper>
            </Container>
        );
    }

    const total = getTotal();

    return (
        <Container maxWidth="lg" sx={{
            py: { xs: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 }
        }}>
            {/* Cabeçalho */}
            <Box
                sx={{
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Button
                    onClick={handleBackToMenu}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        alignSelf: 'flex-start',
                        color: '#AF1D1D',
                        fontFamily: '"Libre Baskerville", serif',
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        backgroundColor: 'rgba(175, 29, 29, 0.2)',
                        borderRadius: '30px',
                        padding: { xs: '8px 10px', sm: '5px 15px' },
                        '&:hover': {
                            backgroundColor: 'rgba(175, 29, 29, 0.1)',
                        }
                    }}
                >
                    Voltar
                </Button>

                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '1.4rem', sm: '2rem', md: '2rem' },
                        fontWeight: 'bold',
                        color: '#AF1D1D'
                    }}
                >
                    Meu Carrinho ({getTotalItems()})
                </Typography>

                {tableNumber && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#25D366',
                            fontFamily: '"Libre Baskerville", serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        Mesa: {tableNumber}
                    </Typography>
                )}
            </Box>

            {/* Lista de Itens do Carrinho */}
            <Box sx={{ mb: 4 }}>
                {cart.map((item) => (
                    <React.Fragment key={item.id}>
                        {isMobile ? (
                            <CartItemMobile item={item} />
                        ) : (
                            <CartItemDesktop item={item} />
                        )}
                    </React.Fragment>
                ))}
            </Box>

            {/* Resumo do Pedido */}
            <Paper
                elevation={3}
                sx={{
                    background: 'linear-gradient(145deg, #2C0606, #110A09)',
                    borderRadius: '30px',
                    p: { xs: 3, sm: 4 },
                    border: '1px solid rgba(175, 29, 29, 0.3)',
                    mb: 4
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '1.3rem', sm: '1.5rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 3
                    }}
                >
                    Resumo do Pedido
                </Typography>

                <Box sx={{ mb: 3 }}>
                    {/* Subtotal */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2
                    }}>
                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: { xs: '0.95rem', sm: '1rem' }
                            }}
                        >
                            Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'itens'})
                        </Typography>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}
                        >
                            R$ {total.toFixed(2)}
                        </Typography>
                    </Box>

                    <Divider sx={{
                        my: 2.5,
                        borderColor: 'rgba(175, 29, 29, 0.3)',
                        borderWidth: 1
                    }} />

                    {/* Total */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                fontWeight: 'bold'
                            }}
                        >
                            Total
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#AF1D1D',
                                fontWeight: 'bold',
                                fontSize: { xs: '1.5rem', sm: '1.8rem' }
                            }}
                        >
                            R$ {(total).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                {/* Botões de ação */}
                <Stack
                    spacing={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        variant="outlined"
                        onClick={clearCart}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: '#AF1D1D',
                            borderColor: '#AF1D1D',
                            borderRadius: '30px',
                            padding: { xs: '10px 25px', sm: '12px 30px' },
                            width: { xs: '100%', sm: 'auto' },
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(175, 29, 29, 0.1)',
                                borderColor: '#8a1818'
                            }
                        }}
                    >
                        Limpar Carrinho
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleFinalizeOrder}
                        startIcon={<WhatsAppIcon sx={{ fontSize: { xs: '2rem', sm: '2rem', md: '2.2rem' } }} />}
                        sx={{
                            backgroundColor: '#25D366',
                            color: 'white',
                            borderRadius: '30px',
                            padding: { xs: '12px 25px', sm: '14px 35px' },
                            width: { xs: '100%', sm: 'auto' },
                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1da851',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                fontWeight: 'bold',
                                color: 'white',
                            }}
                        >
                            Enviar Pedido no WhatsApp
                        </Typography>
                    </Button>
                </Stack>
            </Paper>

            {/* Informação adicional */}
            <Typography
                variant="body2"
                sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    textAlign: 'center',
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    fontStyle: 'italic'
                }}
            >
                * O pedido será enviado para o WhatsApp do restaurante. Aguarde a confirmação.
            </Typography>

            {/* Modal WhatsApp */}
            <WhatsAppModal />

            {/* Snackbar para feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Carrinho;