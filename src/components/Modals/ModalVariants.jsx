import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
    Grid,
    TextField,
    Card,
    CardContent,
    Divider,
    useTheme,
    useMediaQuery,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const ModalVariants = ({ open, onClose, produto, onConfirm }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Estado para quantidade de cada sabor
    const [quantidades, setQuantidades] = useState({});
    const [observacao, setObservacao] = useState('');

    // Inicializar quantidades quando abrir o modal
    useEffect(() => {
        if (open && produto?.variantes) {
            const inicialQuantidades = {};
            produto.variantes.forEach(variante => {
                inicialQuantidades[variante.id] = 0;
            });
            setQuantidades(inicialQuantidades);
            setObservacao('');
        }
    }, [open, produto]);

    // Funções para alterar quantidade
    const aumentarQuantidade = (saborId) => {
        setQuantidades(prev => ({
            ...prev,
            [saborId]: (prev[saborId] || 0) + 1
        }));
    };

    const diminuirQuantidade = (saborId) => {
        setQuantidades(prev => ({
            ...prev,
            [saborId]: Math.max(0, (prev[saborId] || 0) - 1)
        }));
    };

    const handleQuantidadeChange = (saborId, valor) => {
        const num = parseInt(valor) || 0;
        setQuantidades(prev => ({
            ...prev,
            [saborId]: Math.max(0, num)
        }));
    };

    const calcularTotais = () => {
        let totalQuantidade = 0;
        let totalPreco = 0;
        let saboresSelecionados = [];

        if (produto?.variantes) {
            produto.variantes.forEach(variante => {
                const qtd = quantidades[variante.id] || 0;
                if (qtd > 0) {
                    totalQuantidade += qtd;
                    totalPreco += qtd * variante.preco;
                    saboresSelecionados.push({
                        ...variante,
                        quantidade: qtd
                    });
                }
            });
        }

        return {
            totalQuantidade,
            totalPreco: totalPreco.toFixed(2),
            saboresSelecionados
        };
    };

    const handleConfirmar = () => {
        if (!produto) return;

        const { totalQuantidade, totalPreco, saboresSelecionados } = calcularTotais();

        if (totalQuantidade === 0) {
            // Não permitir adicionar sem quantidade
            return;
        }

        // Se apenas um sabor foi selecionado, adiciona como item único
        if (saboresSelecionados.length === 1) {
            const variante = saboresSelecionados[0];
            const produtoComVariante = {
                id: `${produto.id}_${variante.id}`,
                nome: `${produto.nome} - ${variante.nome}`,
                descricao: produto.descricao,
                preco: variante.preco,
                precoOriginal: produto.preco,
                imagem: produto.imagem,
                varianteNome: variante.nome,
                varianteId: variante.id,
                produtoId: produto.id,
                quantidade: variante.quantidade,
                observacao: observacao.trim() || null
            };
            onConfirm(produtoComVariante);
        } else {
            // Para múltiplos sabores, cria um item agrupado
            const nomesSabores = saboresSelecionados.map(s => `${s.quantidade}x ${s.nome}`).join(', ');
            const produtoAgrupado = {
                id: `${produto.id}_variados_${Date.now()}`,
                nome: `${produto.nome} - Variados`,
                descricao: `Porção com ${totalQuantidade} espetinhos: ${nomesSabores}`,
                // CORREÇÃO: Usar o preço TOTAL em vez do preço médio
                preco: parseFloat(totalPreco), // TOTAL, não média
                precoOriginal: produto.preco,
                imagem: produto.imagem,
                quantidade: 1, // CORREÇÃO: Quantidade sempre 1 para o item agrupado
                sabores: saboresSelecionados,
                observacao: observacao.trim() || null,
                ehVariado: true
            };
            onConfirm(produtoAgrupado);
        }

        onClose();
    };

    const { totalQuantidade, totalPreco } = calcularTotais();
    const temSaboresSelecionados = totalQuantidade > 0;

    if (!produto) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={isMobile}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : '24px',
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: isMobile ? '100vh' : '90vh'
                }
            }}
        >
            {/* Cabeçalho */}
            <DialogTitle
                sx={{
                    backgroundColor: '#1A1A1A',
                    color: 'white',
                    py: 2.5,
                    px: 3,
                    borderBottom: '1px solid #2A2A2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocalFireDepartmentIcon sx={{
                        color: '#FF5722',
                        fontSize: 28
                    }} />
                    <Box>
                        <Typography variant="h6" sx={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                            color: 'white',
                            fontFamily: '"Libre Baskerville", serif'
                        }}>
                            Monte sua porção
                        </Typography>
                        <Typography variant="caption" sx={{
                            color: '#888',
                            fontSize: '0.8rem'
                        }}>
                            Escolha quantos de cada sabor
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: '#888',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
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
                overflowY: 'auto',
                maxHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(90vh - 140px)',
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
                }
            }}>
                {/* Informações do Produto */}
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: '#252525',
                        borderRadius: '16px',
                        mb: 3,
                        border: '1px solid #2A2A2A'
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2.5,
                            mb: 2
                        }}>
                            <Box
                                component="img"
                                src={produto.imagem}
                                alt={produto.nome}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '12px',
                                    objectFit: 'cover',
                                    border: '2px solid #AF1D1D'
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"Libre Baskerville", serif',
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 0.5,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {produto.nome}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#AAA',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.4
                                    }}
                                >
                                    {produto.descricao}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            icon={<LocalFireDepartmentIcon />}
                            label="ESPETINHOS VARIADOS"
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 87, 34, 0.15)',
                                color: '#FF5722',
                                fontWeight: 600,
                                fontFamily: '"Libre Baskerville", serif',
                                border: '1px solid rgba(255, 87, 34, 0.3)'
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Instruções */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: 'rgba(175, 29, 29, 0.1)',
                        borderRadius: '12px',
                        p: 2,
                        mb: 3,
                        border: '1px solid rgba(175, 29, 29, 0.2)'
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#af1d1d',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            fontFamily: '"Libre Baskerville", serif',
                            fontStyle: 'italic'
                        }}
                    >
                        Selecione quantos espetinhos de cada sabor você deseja
                    </Typography>
                </Paper>

                {/* Seleção de Sabores com Quantidade */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: '#AAA',
                            mb: 2,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}
                    >
                        Escolha os sabores e quantidades
                    </Typography>

                    <Grid spacing={2} sx={{ mb: 4 }}>
                        {produto.variantes?.map((variante) => {
                            const quantidadeAtual = quantidades[variante.id] || 0;
                            const temQuantidade = quantidadeAtual > 0;

                            return (
                                <Grid item xs={12} lg={12} key={variante.id}>
                                    <Card
                                        sx={{
                                            mb: 2,
                                            backgroundColor: temQuantidade
                                                ? 'rgba(175, 29, 29, 0.15)'
                                                : '#252525',
                                            border: temQuantidade
                                                ? '1px solid #AF1D1D'
                                                : '1px solid #2A2A2A',
                                            borderRadius: '20px',
                                            transition: 'all 0.2s ease',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 2
                                            }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    {temQuantidade && (
                                                        <CheckCircleIcon
                                                            sx={{
                                                                color: '#af1d1d',
                                                                fontSize: '1.2rem'
                                                            }}
                                                        />
                                                    )}
                                                    <RestaurantIcon sx={{
                                                        color: temQuantidade ? '#AF1D1D' : '#666',
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Typography
                                                        sx={{
                                                            fontFamily: '"Libre Baskerville", serif',
                                                            color: temQuantidade ? '#af1d1d' : 'white',
                                                            fontWeight: temQuantidade ? 600 : 400,
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        {variante.nome}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Chip
                                                        label={`R$ ${variante.preco.toFixed(2)}`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: temQuantidade ? '#AF1D1D' : '#2A2A2A',
                                                            color: temQuantidade ? 'white' : '#AAA',
                                                            fontWeight: 600,
                                                            fontSize: '0.85rem',
                                                            height: '24px'
                                                        }}
                                                    />

                                                    {variante.id === 'coracao' && (
                                                        <Chip
                                                            icon={<LocalFireDepartmentIcon sx={{ fontSize: '0.9rem' }} />}
                                                            label="Popular"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: 'rgba(255, 87, 34, 0.15)',
                                                                color: '#FF5722',
                                                                border: '1px solid rgba(255, 87, 34, 0.3)',
                                                                fontSize: '0.7rem'
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>

                                            {/* Controles de Quantidade */}
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                borderRadius: '8px',
                                                p: 1.5
                                            }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#888',
                                                            fontSize: '0.8rem',
                                                            display: 'block',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        Quantidade
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: temQuantidade ? '#af1d1d' : '#AAA',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {quantidadeAtual} unidade{quantidadeAtual !== 1 ? 's' : ''}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}>
                                                    <IconButton
                                                        onClick={() => diminuirQuantidade(variante.id)}
                                                        size="small"
                                                        disabled={quantidadeAtual === 0}
                                                        sx={{
                                                            backgroundColor: '#2A2A2A',
                                                            color: quantidadeAtual === 0 ? '#666' : '#AF1D1D',
                                                            border: '1px solid #3A3A3A',
                                                            width: 32,
                                                            height: 32,
                                                            '&:hover:not(:disabled)': {
                                                                backgroundColor: '#AF1D1D',
                                                                color: 'white'
                                                            },
                                                            '&.Mui-disabled': {
                                                                backgroundColor: '#1A1A1A'
                                                            }
                                                        }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>

                                                    <TextField
                                                        value={quantidadeAtual}
                                                        onChange={(e) => handleQuantidadeChange(variante.id, e.target.value)}
                                                        type="number"
                                                        inputProps={{
                                                            min: 0,
                                                            style: {
                                                                textAlign: 'center',
                                                                color: 'white',
                                                                padding: '4px'
                                                            }
                                                        }}
                                                        sx={{
                                                            width: 60,
                                                            borderRadius: '20px',
                                                            '& .MuiOutlinedInput-root': {
                                                                backgroundColor: '#2A2A2A',
                                                                borderRadius: '21px',
                                                                minHeight: '36px',
                                                                '& fieldset': {
                                                                    borderColor: '#3A3A3A'
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: '#AF1D1D'
                                                                }
                                                            }
                                                        }}
                                                    />

                                                    <IconButton
                                                        onClick={() => aumentarQuantidade(variante.id)}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#2A2A2A',
                                                            color: '#AF1D1D',
                                                            border: '1px solid #3A3A3A',
                                                            width: 32,
                                                            height: 32,
                                                            '&:hover': {
                                                                backgroundColor: '#AF1D1D',
                                                                color: 'white'
                                                            }
                                                        }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            {/* Subtotal do sabor */}
                                            {temQuantidade && (
                                                <Box sx={{
                                                    mt: 1.5,
                                                    pt: 1,
                                                    borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#AAA',
                                                            fontSize: '0.8rem'
                                                        }}
                                                    >
                                                        Subtotal
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#AF1D1D',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        R$ {(quantidadeAtual * variante.preco).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Campo de Observação */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: '#AAA',
                            mb: 1.5,
                            fontWeight: 600,
                            fontSize: '0.9rem'
                        }}
                    >
                        Observação (opcional)
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Ex: Bem passado, ponto certo, com queijo extra..."
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#252525',
                                borderColor: '#2A2A2A',
                                borderRadius: '8px',
                                color: 'white',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AF1D1D'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AF1D1D'
                                }
                            },
                            '& .MuiInputBase-input': {
                                '&::placeholder': {
                                    color: '#666',
                                    opacity: 1
                                }
                            }
                        }}
                    />
                </Box>

                {/* Resumo do Pedido */}
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: '#252525',
                        borderRadius: '16px',
                        mt: 2,
                        border: '1px solid #2A2A2A'
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2
                        }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: '#AAA',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <ShoppingBasketIcon sx={{ fontSize: '1rem' }} />
                                Resumo da Porção
                            </Typography>
                            <Chip
                                label={`${totalQuantidade} ESPETINHOS`}
                                size="small"
                                sx={{
                                    backgroundColor: temSaboresSelecionados ? '#AF1D1D' : '#2A2A2A',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.8rem'
                                }}
                            />
                        </Box>

                        {/* Detalhes dos sabores selecionados */}
                        {produto.variantes?.map((variante) => {
                            const quantidadeAtual = quantidades[variante.id] || 0;
                            if (quantidadeAtual === 0) return null;

                            return (
                                <Box
                                    key={variante.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: 1,
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    <Typography variant="body2" sx={{
                                        color: '#CCC',
                                        fontSize: '0.85rem',
                                        fontFamily: '"Libre Baskerville", serif'
                                    }}>
                                        {variante.nome}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: '#888',
                                        fontSize: '0.85rem'
                                    }}>
                                        {quantidadeAtual}x • R$ {(quantidadeAtual * variante.preco).toFixed(2)}
                                    </Typography>
                                </Box>
                            );
                        })}

                        {!temSaboresSelecionados && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                    py: 2,
                                    fontStyle: 'italic'
                                }}
                            >
                                Selecione pelo menos um espetinho
                            </Typography>
                        )}

                        <Divider sx={{
                            borderColor: '#2A2A2A',
                            my: 2,
                            borderStyle: temSaboresSelecionados ? 'solid' : 'dashed'
                        }} />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="h6" sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <LocalFireDepartmentIcon sx={{ color: '#FF5722' }} />
                                Total
                            </Typography>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h5" sx={{
                                    color: '#AF1D1D',
                                    fontWeight: 700,
                                    fontSize: '1.4rem'
                                }}>
                                    R$ {totalPreco}
                                </Typography>
                                <Typography variant="caption" sx={{
                                    color: '#888',
                                    fontSize: '0.75rem'
                                }}>
                                    {totalQuantidade} espetinho{totalQuantidade !== 1 ? 's' : ''}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </DialogContent>

            {/* Rodapé FIXO */}
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
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: '#888',
                        borderColor: '#444',
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        fontSize: '0.9rem',
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
                    startIcon={<AddShoppingCartIcon sx={{ fontSize: '1.1rem' }} />}
                    onClick={handleConfirmar}
                    disabled={!temSaboresSelecionados}
                    sx={{
                        backgroundColor: temSaboresSelecionados ? '#AF1D1D' : 'rgba(175, 29, 29, 0.3)',
                        color: 'white',
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        flex: 2,
                        '&:hover': {
                            backgroundColor: temSaboresSelecionados ? '#8a1818' : 'rgba(175, 29, 29, 0.3)',
                            transform: temSaboresSelecionados ? 'translateY(-1px)' : 'none',
                            boxShadow: temSaboresSelecionados ? '0 4px 12px rgba(175, 29, 29, 0.3)' : 'none'
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(175, 29, 29, 0.1)',
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {temSaboresSelecionados
                        ? `Adicionar ${totalQuantidade} Espetinho${totalQuantidade !== 1 ? 's' : ''}`
                        : 'Adicionar ao Carrinho'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalVariants;