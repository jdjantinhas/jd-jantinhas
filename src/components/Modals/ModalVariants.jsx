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
    Paper,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

/**
 * Modal para seleção de variantes (sabores)
 * 
 * @param {Object} props
 * @param {boolean} props.open - Controla a abertura do modal
 * @param {Function} props.onClose - Função para fechar o modal
 * @param {Object} props.produto - Produto com campo `variantes` e opcionalmente `variantType` ('single' ou 'multiple')
 * @param {Function} props.onConfirm - Callback recebendo o objeto do produto configurado
 */
const ModalVariants = ({ open, onClose, produto, onConfirm }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Determina o tipo de variante (padrão: 'multiple' para compatibilidade)
    const variantType = produto?.variantType || 'multiple';

    // Detecta se é o produto especial "Jantinha com Espetinho" (ID 4)
    const isJantinhaEspecial = produto?.id === 4;

    // Estados para modo single (escolhe um sabor e quantidade)
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [singleQuantity, setSingleQuantity] = useState(1);

    // Estados para modo multiple (quantidade por sabor)
    const [quantidades, setQuantidades] = useState({});

    // Estado específico para o número de jantinhas (apenas para o produto especial)
    const [numJantinhas, setNumJantinhas] = useState(1);

    // Observação (comum aos dois modos)
    const [observacao, setObservacao] = useState('');

    // Inicializa estados quando o modal abre
    useEffect(() => {
        if (open && produto?.variantes) {
            if (variantType === 'single') {
                // Seleciona o primeiro sabor por padrão
                setSelectedVariantId(produto.variantes[0]?.id || null);
                setSingleQuantity(1);
            } else {
                // Zera todas as quantidades
                const inicial = {};
                produto.variantes.forEach(v => { inicial[v.id] = 0; });
                setQuantidades(inicial);
            }
            // Se for o especial, reinicia o número de jantinhas
            if (isJantinhaEspecial) {
                setNumJantinhas(1);
            }
            setObservacao('');
        }
    }, [open, produto, variantType, isJantinhaEspecial]);

    // Handlers para modo multiple
    // Função auxiliar para reduzir quantidades quando o limite de jantinhas diminui
    const reduzirQuantidadesParaLimite = (novoLimite) => {
        const somaAtual = Object.values(quantidades).reduce((a, b) => a + b, 0);
        if (somaAtual <= novoLimite) return; // não precisa reduzir

        let aReduzir = somaAtual - novoLimite;
        const novasQuantidades = { ...quantidades };
        // Itera sobre as variantes na ordem inversa (último para primeiro)
        for (let i = produto.variantes.length - 1; i >= 0; i--) {
            const saborId = produto.variantes[i].id;
            const qtdAtual = novasQuantidades[saborId] || 0;
            if (qtdAtual > 0) {
                const reduzirAqui = Math.min(qtdAtual, aReduzir);
                novasQuantidades[saborId] = qtdAtual - reduzirAqui;
                aReduzir -= reduzirAqui;
                if (aReduzir === 0) break;
            }
        }
        setQuantidades(novasQuantidades);
    };

    const aumentarJantinha = () => {
        setNumJantinhas(prev => prev + 1);
        // Não precisa mexer nas quantidades, pois a soma atual é <= prev (ou pode ser menor)
    };

    const diminuirJantinha = () => {
        setNumJantinhas(prev => {
            const novo = Math.max(1, prev - 1);
            // Se a soma atual for maior que o novo limite, reduzimos
            reduzirQuantidadesParaLimite(novo);
            return novo;
        });
    };

    const handleNumJantinhasChange = (valor) => {
        const num = parseInt(valor) || 1;
        const novo = Math.max(1, num);
        reduzirQuantidadesParaLimite(novo);
        setNumJantinhas(novo);
    };

    const aumentarQuantidade = (saborId) => {
        if (isJantinhaEspecial) {
            const somaAtual = Object.values(quantidades).reduce((a, b) => a + b, 0);
            if (somaAtual >= numJantinhas) return; // não pode aumentar além do limite
        }
        setQuantidades(prev => ({ ...prev, [saborId]: (prev[saborId] || 0) + 1 }));
    };

    const diminuirQuantidade = (saborId) => {
        setQuantidades(prev => ({ ...prev, [saborId]: Math.max(0, (prev[saborId] || 0) - 1) }));
    };

    const handleQuantidadeChange = (saborId, valor) => {
        const num = parseInt(valor) || 0;
        if (isJantinhaEspecial) {
            const somaAtual = Object.values(quantidades).reduce((a, b) => a + b, 0);
            const diferenca = num - (quantidades[saborId] || 0);
            if (somaAtual + diferenca > numJantinhas) {
                // Se ultrapassar, define para o máximo possível
                const maxPermitido = (quantidades[saborId] || 0) + (numJantinhas - somaAtual);
                setQuantidades(prev => ({ ...prev, [saborId]: Math.max(0, maxPermitido) }));
            } else {
                setQuantidades(prev => ({ ...prev, [saborId]: Math.max(0, num) }));
            }
        } else {
            setQuantidades(prev => ({ ...prev, [saborId]: Math.max(0, num) }));
        }
    };

    // Handlers para modo single
    const aumentarSingle = () => setSingleQuantity(prev => prev + 1);
    const diminuirSingle = () => setSingleQuantity(prev => Math.max(1, prev - 1));
    const handleSingleQuantityChange = (valor) => {
        const num = parseInt(valor) || 0;
        setSingleQuantity(Math.max(1, num));
    };

    // Calcula totais
    const calcularTotais = () => {
        let totalQuantidade = 0;
        let totalPreco = 0;
        let saboresSelecionados = [];

        if (!produto) return { totalQuantidade: 0, totalPreco: 0, saboresSelecionados: [] };

        const precoBase = produto.preco || 0;

        if (variantType === 'single') {
            if (!selectedVariantId) return { totalQuantidade: 0, totalPreco: 0, saboresSelecionados: [] };
            const variante = produto.variantes.find(v => v.id === selectedVariantId);
            if (!variante) return { totalQuantidade: 0, totalPreco: 0, saboresSelecionados: [] };

            totalQuantidade = singleQuantity;
            // Se a variante tem preço > 0, usa ele; senão usa o preço base do produto
            const precoUnitario = variante.preco > 0 ? variante.preco : precoBase;
            totalPreco = precoUnitario * singleQuantity;
            saboresSelecionados = [{
                ...variante,
                quantidade: singleQuantity,
                precoUnitarioUsado: precoUnitario
            }];
        } else {
            // modo multiple: soma quantidades e preços das variantes
            produto.variantes.forEach(variante => {
                const qtd = quantidades[variante.id] || 0;
                if (qtd > 0) {
                    totalQuantidade += qtd;
                    saboresSelecionados.push({ ...variante, quantidade: qtd });
                }
            });

            // Cálculo do preço total
            if (isJantinhaEspecial) {
                // Para a jantinha especial, o preço é baseado no número de jantinhas
                totalPreco = precoBase * numJantinhas;
            } else {
                // Lógica original: se todas as variantes têm preço zero, usa precoBase * totalQuantidade
                if (saboresSelecionados.length > 0 && saboresSelecionados.every(s => s.preco === 0)) {
                    totalPreco = precoBase * totalQuantidade;
                } else {
                    totalPreco = saboresSelecionados.reduce((acc, s) => acc + (s.quantidade * (s.preco || 0)), 0);
                }
            }
        }

        return {
            totalQuantidade,
            totalPreco: Number(totalPreco.toFixed(2)),
            saboresSelecionados
        };
    };

    const { totalQuantidade, totalPreco, saboresSelecionados } = calcularTotais();

    // Condição para habilitar o botão de confirmar
    const temSaboresSelecionados = isJantinhaEspecial
        ? totalQuantidade === numJantinhas && totalQuantidade > 0
        : totalQuantidade > 0;

    const handleConfirmar = () => {
        if (!produto || totalQuantidade === 0) return;
        if (isJantinhaEspecial && totalQuantidade !== numJantinhas) return;

        if (variantType === 'single') {
            // Modo single: um sabor com quantidade
            const variante = saboresSelecionados[0];
            // Gera ID único composto: produtoId + varianteId
            const uniqueId = `${produto.id}_${variante.id}`;
            const produtoParaCarrinho = {
                id: uniqueId,
                nome: `${produto.nome} - ${variante.nome}`,
                descricao: produto.descricao,
                preco: totalPreco / totalQuantidade, // preço unitário (já calculado)
                imagem: produto.imagem,
                varianteNome: variante.nome,
                varianteId: variante.id,
                produtoId: produto.id,
                quantidade: totalQuantidade,
                observacao: observacao.trim() || null
            };
            onConfirm(produtoParaCarrinho);
        } else {
            // Modo multiple
            if (isJantinhaEspecial) {
                // Sempre cria item agrupado para a jantinha especial
                const nomesSabores = saboresSelecionados.map(s => `${s.quantidade}x ${s.nome}`).join(', ');
                const produtoAgrupado = {
                    id: `${produto.id}_jantinha_${Date.now()}`,
                    nome: `${produto.nome} - ${saboresSelecionados.length > 1 ? 'Variados' : saboresSelecionados[0].nome}`,
                    descricao: `${numJantinhas} jantinha(s) com espetinhos: ${nomesSabores}`,
                    preco: totalPreco, // já calculado como produto.preco * numJantinhas
                    imagem: produto.imagem,
                    quantidade: 1,
                    sabores: saboresSelecionados,
                    observacao: observacao.trim() || null,
                    ehVariado: true,
                    numJantinhas: numJantinhas // opcional, para referência
                };
                onConfirm(produtoAgrupado);
            } else {
                // Comportamento original para múltiplos comuns
                if (saboresSelecionados.length === 1) {
                    // Apenas um sabor selecionado, pode ser tratado como item simples
                    const variante = saboresSelecionados[0];
                    const precoUnitario = variante.preco > 0 ? variante.preco : produto.preco;
                    const uniqueId = `${produto.id}_${variante.id}`;
                    const produtoParaCarrinho = {
                        id: uniqueId,
                        nome: `${produto.nome} - ${variante.nome}`,
                        descricao: produto.descricao,
                        preco: precoUnitario,
                        imagem: produto.imagem,
                        varianteNome: variante.nome,
                        varianteId: variante.id,
                        produtoId: produto.id,
                        quantidade: variante.quantidade,
                        observacao: observacao.trim() || null
                    };
                    onConfirm(produtoParaCarrinho);
                } else {
                    // Múltiplos sabores: cria um item agrupado
                    const nomesSabores = saboresSelecionados.map(s => `${s.quantidade}x ${s.nome}`).join(', ');
                    const produtoAgrupado = {
                        id: `${produto.id}_variados_${Date.now()}`,
                        nome: `${produto.nome} - Variados`,
                        descricao: `Porção com ${totalQuantidade} espetinhos: ${nomesSabores}`,
                        preco: totalPreco,
                        imagem: produto.imagem,
                        quantidade: 1,
                        sabores: saboresSelecionados,
                        observacao: observacao.trim() || null,
                        ehVariado: true
                    };
                    onConfirm(produtoAgrupado);
                }
            }
        }

        onClose();
    };

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
                    <LocalFireDepartmentIcon sx={{ color: '#FF5722', fontSize: 28 }} />
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', color: 'white', fontFamily: '"Libre Baskerville", serif' }}>
                            {variantType === 'single' ? 'Escolha o sabor' : 'Monte sua porção'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.8rem' }}>
                            {variantType === 'single'
                                ? 'Selecione 1 sabor e a quantidade'
                                : 'Escolha quantos de cada sabor'}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: '#888',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Conteúdo */}
            <DialogContent sx={{
                backgroundColor: '#1A1A1A',
                py: 3,
                px: 3,
                overflowY: 'auto',
                maxHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(90vh - 140px)',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { backgroundColor: '#2A2A2A', borderRadius: '10px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#444', borderRadius: '10px' }
            }}>
                {/* Informações do Produto */}
                <Card elevation={0} sx={{ backgroundColor: '#252525', borderRadius: '30px', mb: 3, mt: 2, border: '1px solid #2A2A2A' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 0 }}>
                            <Box
                                component="img"
                                src={produto.imagem}
                                alt={produto.nome}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '20px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontFamily: '"Libre Baskerville", serif', fontWeight: 700, color: 'white', mb: 0.5, fontSize: '1.1rem' }}>
                                    {produto.nome}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#AAA', fontSize: '0.9rem', lineHeight: 1.4 }}>
                                    {produto.descricao}
                                </Typography>
                            </Box>
                        </Box>

                        {/* <Chip
                            icon={<LocalFireDepartmentIcon />}VARIEDADE
                            label={variantType === 'single' ? 'ESCOLHA 1 SABOR' : ' DE SABORES'}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 87, 34, 0.15)',
                                color: '#FF5722',
                                fontWeight: 600,
                                fontFamily: '"Libre Baskerville", serif',
                                border: '1px solid rgba(255, 87, 34, 0.3)',
                            }}
                        /> */}

                        {/* <Paper elevation={0} sx={{ backgroundColor: 'rgba(175, 29, 29, 0.01)', borderRadius: '17px', p: 2, mt: 1, border: '1px solid #263238' }}>
                            <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.9rem', textAlign: 'center', fontFamily: '"Libre Baskerville", serif', fontStyle: 'italic' }}>
                                {variantType === 'single'
                                    ? 'Selecione o sabor e a quantidade desejada'
                                    : 'Escolha quantos de cada sabor você deseja!'}
                            </Typography>
                        </Paper> */}
                    </CardContent>
                </Card>

                {/* Área de seleção */}
                {variantType === 'single' ? (
                    // Modo single: radio buttons + quantidade
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: '#AAA', mb: 2, fontWeight: 600, fontSize: '0.9rem' }}>
                            Escolha o sabor
                        </Typography>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup value={selectedVariantId} onChange={(e) => setSelectedVariantId(e.target.value)}>
                                <Grid container spacing={2}>
                                    {produto.variantes?.map((variante) => (
                                        <Grid item xs={12} key={variante.id}>
                                            <Card sx={{
                                                backgroundColor: selectedVariantId === variante.id ? 'rgba(175, 29, 29, 0.15)' : '#252525',
                                                border: selectedVariantId === variante.id ? '1px solid #AF1D1D' : '1px solid #2A2A2A',
                                                borderRadius: '20px',
                                                transition: 'all 0.2s ease'
                                            }}>
                                                <CardContent sx={{ p: 2 }}>
                                                    <FormControlLabel
                                                        value={variante.id}
                                                        control={<Radio sx={{ color: '#AF1D1D', '&.Mui-checked': { color: '#AF1D1D' } }} />}
                                                        label={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                                                <RestaurantIcon sx={{ color: selectedVariantId === variante.id ? '#AF1D1D' : '#666' }} />
                                                                <Typography sx={{ color: selectedVariantId === variante.id ? '#af1d1d' : 'white', fontWeight: selectedVariantId === variante.id ? 600 : 400 }}>
                                                                    {variante.nome}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        sx={{ width: '100%', m: 0 }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                        </FormControl>

                        {/* Controle de quantidade para modo single */}
                        {selectedVariantId && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" sx={{ color: '#AAA', mb: 1.5, fontWeight: 600, fontSize: '0.9rem' }}>
                                    Quantidade
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#252525', borderRadius: '8px', p: 1.5 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>
                                            Unidades
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#af1d1d', fontWeight: 600, fontSize: '0.9rem' }}>
                                            {singleQuantity} {singleQuantity === 1 ? 'unidade' : 'unidades'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton onClick={diminuirSingle} size="small" disabled={singleQuantity <= 1} sx={{
                                            backgroundColor: '#2A2A2A',
                                            color: singleQuantity <= 1 ? '#666' : '#AF1D1D',
                                            border: '1px solid #3A3A3A',
                                            width: 32, height: 32,
                                            '&:hover:not(:disabled)': { backgroundColor: '#AF1D1D', color: 'white' }
                                        }}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <TextField
                                            value={singleQuantity}
                                            onChange={(e) => handleSingleQuantityChange(e.target.value)}
                                            type="number"
                                            inputProps={{ min: 1, style: { textAlign: 'center', color: 'white', padding: '4px' } }}
                                            sx={{
                                                width: 60,
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#2A2A2A',
                                                    borderRadius: '21px',
                                                    minHeight: '36px',
                                                    '& fieldset': { borderColor: '#3A3A3A' },
                                                    '&:hover fieldset': { borderColor: '#AF1D1D' }
                                                }
                                            }}
                                        />
                                        <IconButton onClick={aumentarSingle} size="small" sx={{
                                            backgroundColor: '#2A2A2A',
                                            color: '#AF1D1D',
                                            border: '1px solid #3A3A3A',
                                            width: 32, height: 32,
                                            '&:hover': { backgroundColor: '#AF1D1D', color: 'white' }
                                        }}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                ) : (
                    // Modo multiple: controles por sabor
                    <Box sx={{ mb: 3 }}>
                        {isJantinhaEspecial && (
                                <Box sx={{ mb: 3, borderRadius: '30px', p: 2, border: '1px solid #2A2A2A' }}>
                                <Typography variant="subtitle2" sx={{ color: '#AAA', mb: 1.5, fontWeight: 600, fontSize: '0.9rem' }}>
                                    Quantidade de Jantinhas
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#252525', borderRadius: '22px', p: 2 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>
                                            Jantinhas
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#af1d1d', fontWeight: 600, fontSize: '0.9rem' }}>
                                            {numJantinhas} {numJantinhas === 1 ? 'jantinha' : 'jantinhas'}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton onClick={diminuirJantinha} size="small" disabled={numJantinhas <= 1} sx={{
                                            backgroundColor: '#2A2A2A',
                                            color: numJantinhas <= 1 ? '#666' : '#AF1D1D',
                                            border: '1px solid #3A3A3A',
                                            width: 32, height: 32,
                                            '&:hover:not(:disabled)': { backgroundColor: '#AF1D1D', color: 'white' }
                                        }}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <TextField
                                            value={numJantinhas}
                                            onChange={(e) => handleNumJantinhasChange(e.target.value)}
                                            type="number"
                                            inputProps={{ min: 1, style: { textAlign: 'center', color: 'white', padding: '4px' } }}
                                            sx={{
                                                width: 60,
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#2A2A2A',
                                                    borderRadius: '21px',
                                                    minHeight: '36px',
                                                    '& fieldset': { borderColor: '#3A3A3A' },
                                                    '&:hover fieldset': { borderColor: '#AF1D1D' }
                                                }
                                            }}
                                        />
                                        <IconButton onClick={aumentarJantinha} size="small" sx={{
                                            backgroundColor: '#2A2A2A',
                                            color: '#AF1D1D',
                                            border: '1px solid #3A3A3A',
                                            width: 32, height: 32,
                                            '&:hover': { backgroundColor: '#AF1D1D', color: 'white' }
                                        }}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {totalQuantidade > 0 && (
                                    <Typography variant="caption" sx={{ color: totalQuantidade === numJantinhas ? '#4caf50' : '#ff9800', display: 'block', mt: 1, textAlign: 'center' }}>
                                        {totalQuantidade === numJantinhas
                                            ? 'Distribuição Completa!'
                                            : `Faltam ${numJantinhas - totalQuantidade} espetinho(s) para completar`}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        <Typography variant="subtitle2" sx={{ color: '#AAA', mb: 2, fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>
                            Escolha os sabores e quantidades
                        </Typography>
                        <Grid spacing={2}>
                            {produto.variantes?.map((variante) => {
                                const quantidadeAtual = quantidades[variante.id] || 0;
                                const temQuantidade = quantidadeAtual > 0;
                                const somaAtual = Object.values(quantidades).reduce((a, b) => a + b, 0);

                                return (
                                    <Grid item xs={12} key={variante.id}>
                                        <Card sx={{
                                            backgroundColor: temQuantidade ? 'rgba(175, 29, 29, 0.15)' : '#252525',
                                            border: temQuantidade ? '1px solid #AF1D1D' : '1px solid #2A2A2A',
                                            borderRadius: '30px',
                                            transition: 'all 0.2s ease',
                                            mb: 2
                                        }}>
                                            <CardContent sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        {temQuantidade && <CheckCircleIcon sx={{ color: '#af1d1d', fontSize: '1.2rem' }} />}
                                                        <RestaurantIcon sx={{ color: temQuantidade ? '#AF1D1D' : '#666', fontSize: '1.2rem' }} />
                                                        <Typography sx={{ fontFamily: '"Libre Baskerville", serif', color: temQuantidade ? '#af1d1d' : 'white', fontWeight: temQuantidade ? 600 : 400, fontSize: '1rem' }}>
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

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', p: 1.5 }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>
                                                            Quantidade
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: temQuantidade ? '#af1d1d' : '#AAA', fontWeight: 600, fontSize: '0.9rem' }}>
                                                            {quantidadeAtual} unidade{quantidadeAtual !== 1 ? 's' : ''}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <IconButton
                                                            onClick={() => diminuirQuantidade(variante.id)}
                                                            size="small"
                                                            disabled={quantidadeAtual === 0}
                                                            sx={{
                                                                backgroundColor: '#2A2A2A',
                                                                color: quantidadeAtual === 0 ? '#666' : '#AF1D1D',
                                                                border: '1px solid #3A3A3A',
                                                                width: 32, height: 32,
                                                                '&:hover:not(:disabled)': { backgroundColor: '#AF1D1D', color: 'white' }
                                                            }}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <TextField
                                                            value={quantidadeAtual}
                                                            onChange={(e) => handleQuantidadeChange(variante.id, e.target.value)}
                                                            type="number"
                                                            inputProps={{ min: 0, style: { textAlign: 'center', color: 'white', padding: '4px' } }}
                                                            sx={{
                                                                width: 60,
                                                                '& .MuiOutlinedInput-root': {
                                                                    backgroundColor: '#2A2A2A',
                                                                    borderRadius: '21px',
                                                                    minHeight: '36px',
                                                                    '& fieldset': { borderColor: '#3A3A3A' },
                                                                    '&:hover fieldset': { borderColor: '#AF1D1D' }
                                                                }
                                                            }}
                                                        />
                                                        <IconButton
                                                            onClick={() => aumentarQuantidade(variante.id)}
                                                            size="small"
                                                            disabled={isJantinhaEspecial && somaAtual >= numJantinhas}
                                                            sx={{
                                                                backgroundColor: '#2A2A2A',
                                                                color: (isJantinhaEspecial && somaAtual >= numJantinhas) ? '#666' : '#AF1D1D',
                                                                border: '1px solid #3A3A3A',
                                                                width: 32, height: 32,
                                                                '&:hover:not(:disabled)': { backgroundColor: '#AF1D1D', color: 'white' }
                                                            }}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                {temQuantidade && (
                                                    <Box sx={{ mt: 1.5, pt: 1, borderTop: '1px dashed rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="caption" sx={{ color: '#AAA', fontSize: '0.8rem' }}>
                                                            Subtotal
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#AF1D1D', fontWeight: 600, fontSize: '0.9rem' }}>
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
                )}

                {/* Campo de Observação */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#AAA', mb: 1.5, fontWeight: 600, fontSize: '0.9rem' }}>
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
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#AF1D1D' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#AF1D1D' }
                            },
                            '& .MuiInputBase-input::placeholder': { color: '#666', opacity: 1 }
                        }}
                    />
                </Box>

                {/* Resumo */}
                <Card elevation={0} sx={{ backgroundColor: '#252525', borderRadius: '30px', mt: 2, border: '1px solid #2A2A2A' }}>
                    <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#AAA', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ShoppingBasketIcon sx={{ fontSize: '1.4rem' }} />
                                Resumo
                            </Typography>
                            <Chip
                                label={`${totalQuantidade} ${variantType === 'single' ? 'ITEM' : 'ESPETINHOS'}`}
                                size="small"
                                sx={{
                                    backgroundColor: temSaboresSelecionados ? '#AF1D1D' : '#2A2A2A',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.8rem'
                                }}
                            />
                        </Box>

                        {isJantinhaEspecial && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Typography variant="body2" sx={{ color: '#CCC', fontSize: '0.85rem', fontFamily: '"Libre Baskerville", serif' }}>
                                    {numJantinhas} {numJantinhas === 1 ? 'Jantinha' : 'Jantinhas'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888', fontSize: '0.85rem' }}>
                                    R$ {(produto.preco * numJantinhas).toFixed(2)}
                                </Typography>
                            </Box>
                        )}

                        {variantType === 'single' && selectedVariantId && (
                            <Box sx={{ py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#CCC', fontSize: '0.85rem', fontFamily: '"Libre Baskerville", serif' }}>
                                        {produto.variantes.find(v => v.id === selectedVariantId)?.nome}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#888', fontSize: '0.85rem' }}>
                                        {singleQuantity}x • R$ {(totalPreco / singleQuantity).toFixed(2)} cada
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {variantType !== 'single' && !isJantinhaEspecial && saboresSelecionados.map((s, idx) => (
                            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Typography variant="body2" sx={{ color: '#CCC', fontSize: '0.85rem', fontFamily: '"Libre Baskerville", serif' }}>
                                    {s.nome}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888', fontSize: '0.85rem' }}>
                                    {s.quantidade}x • R$ {(s.quantidade * (s.preco || produto.preco)).toFixed(2)}
                                </Typography>
                            </Box>
                        ))}

                        {!temSaboresSelecionados && (
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem', textAlign: 'center', py: 2, fontStyle: 'italic' }}>
                                {isJantinhaEspecial
                                    ? `Selecione exatamente ${numJantinhas} espetinhos`
                                    : 'Selecione pelo menos um item'}
                            </Typography>
                        )}

                        <Divider sx={{ borderColor: '#2A2A2A', my: 2, borderStyle: temSaboresSelecionados ? 'solid' : 'dashed' }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalFireDepartmentIcon sx={{ color: '#FF5722' }} />
                                Total
                            </Typography>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h5" sx={{ color: '#AF1D1D', fontWeight: 700, fontSize: '1.4rem' }}>
                                    R$ {totalPreco.toFixed(2)}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#888', fontSize: '0.75rem' }}>
                                    {totalQuantidade} {totalQuantidade === 1 ? 'item' : 'itens'}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </DialogContent>

            {/* Rodapé com botões */}
            <DialogActions sx={{ backgroundColor: '#1A1A1A', py: 2, px: 3, borderTop: '1px solid #2A2A2A', gap: 1.5, position: 'sticky', bottom: 0, zIndex: 1 }}>
                <Button onClick={onClose} variant="outlined" sx={{
                    color: '#888', borderColor: '#444', borderRadius: '8px', textTransform: 'none',
                    px: { xs: 2, sm: 3 }, py: 1, fontSize: '0.9rem', flex: 1,
                    '&:hover': { backgroundColor: '#252525', borderColor: '#666', color: 'white' }
                }}>
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
                        px: { xs: 2, sm: 3 }, py: 1, fontSize: '0.9rem', fontWeight: 600, flex: 2,
                        '&:hover': {
                            backgroundColor: temSaboresSelecionados ? '#8a1818' : 'rgba(175, 29, 29, 0.3)',
                            transform: temSaboresSelecionados ? 'translateY(-1px)' : 'none',
                            boxShadow: temSaboresSelecionados ? '0 4px 12px rgba(175, 29, 29, 0.3)' : 'none'
                        },
                        '&.Mui-disabled': { backgroundColor: 'rgba(175, 29, 29, 0.1)', color: 'rgba(255, 255, 255, 0.3)' },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {temSaboresSelecionados
                        ? (isJantinhaEspecial
                            ? `Adicionar ${numJantinhas} jantinha(s)`
                            : `Adicionar ${totalQuantidade} ${variantType === 'single' ? 'item' : 'espetinho'}${totalQuantidade !== 1 ? 's' : ''}`)
                        : 'Adicionar ao Carrinho'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalVariants;