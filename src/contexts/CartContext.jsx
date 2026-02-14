import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { validateCart, validateTableNumber } from '../utils/validation';

const STORAGE_KEYS = {
    CART: 'jd_jantinhas_cart',
    TABLE: 'jd_jantinhas_table',
    ORDER_HISTORY: 'jd_jantinhas_order_history',
    ORDER_COUNTS: 'restaurant_order_counts'
};

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [tableNumber, setTableNumber] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
            const savedHistory = localStorage.getItem(STORAGE_KEYS.ORDER_HISTORY);

            // CARREGA A MESA DO LOCALSTORAGE
            const savedTable = localStorage.getItem('restaurant_table');
            console.log('CartContext: Carregando mesa do localStorage:', savedTable);

            if (savedTable) {
                try {
                    const tableData = JSON.parse(savedTable);
                    // Verifica se a mesa ainda é válida (últimas 4 horas)
                    const isRecent = Date.now() - tableData.timestamp < 4 * 60 * 60 * 1000;
                    if (isRecent && tableData.number && tableData.number > 0 && tableData.number <= 50) {
                        console.log('CartContext: Mesa carregada:', tableData.number);
                        setTableNumber(tableData.number);
                    } else {
                        console.log('CartContext: Mesa expirada ou inválida');
                    }
                } catch (error) {
                    console.error('Erro ao parsear dados da mesa:', error);
                }
            }

            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    console.log('CartContext: Carrinho carregado:', parsedCart);
                    setCart(parsedCart);
                } catch (error) {
                    console.error('Erro ao carregar carrinho:', error);
                    setCart([]);
                }
            }

            if (savedHistory) {
                try {
                    setOrderHistory(JSON.parse(savedHistory));
                } catch (error) {
                    console.error('Erro ao carregar histórico:', error);
                    setOrderHistory([]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }, []);

    // Salvar carrinho no localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error);
        }
    }, [cart]);

    // Calcular total - DEVE VIR ANTES DE QUALQUER FUNÇÃO QUE O USE
    const getTotal = useCallback(() => {
        console.log('Calculando total, carrinho:', cart);
        return cart.reduce((total, item) => {
            const itemTotal = item.preco * item.quantidade;
            if (isNaN(itemTotal)) {
                console.error('Erro no cálculo do item:', item);
                return total;
            }
            return total + itemTotal;
        }, 0);
    }, [cart]);

    // Verificar se o carrinho está vazio
    const isCartEmpty = useCallback(() => {
        return cart.length === 0;
    }, [cart]);

    // Obter quantidade total de itens
    const getTotalItems = useCallback(() => {
        return cart.reduce((total, item) => total + item.quantidade, 0);
    }, [cart]);

    // Validação de item
    const validateCartItem = useCallback((item) => {
        if (!item || typeof item !== 'object') {
            return { isValid: false, error: 'Item inválido' };
        }

        // Permitir tanto number quanto string para o ID
        if (!item.id || (typeof item.id !== 'number' && typeof item.id !== 'string')) {
            return { isValid: false, error: 'ID do produto inválido' };
        }

        if (!item.nome || typeof item.nome !== 'string') {
            return { isValid: false, error: 'Nome do produto inválido' };
        }

        if (!item.preco || typeof item.preco !== 'number' || item.preco <= 0) {
            return { isValid: false, error: 'Preço do produto inválido' };
        }

        // Quantidade pode vir separada ou no objeto
        const quantidade = item.quantidade !== undefined ? item.quantidade : 1;
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { isValid: false, error: 'Quantidade inválida' };
        }

        return { isValid: true };
    }, []);

    // Adicionar item ao carrinho com validação
    const addToCart = useCallback((product, quantity = 1) => {
        if (!product || typeof product !== 'object') {
            console.error('Produto inválido:', product);
            return;
        }

        // Se quantity for undefined, usa a quantidade do produto
        const qtd = quantity !== undefined ? quantity : (product.quantidade || 1);

        // Validar quantidade - ALTERADO: limite de 50 unidades
        if (typeof qtd !== 'number' || qtd <= 0 || qtd > 50) {
            console.error('Quantidade inválida:', qtd);
            return;
        }

        // Validar dados do produto
        const validation = validateCartItem(product);
        if (!validation.isValid) {
            console.error('Erro na validação do produto:', validation.error);
            return;
        }

        console.log('Adicionando ao carrinho:', product.nome, 'Qtd:', qtd);

        setCart(prevCart => {
            // Se o produto for variado (múltiplos sabores), trata como item único
            if (product.ehVariado) {
                // Adiciona como novo item (não agrupa com outros variados)
                const newItem = {
                    id: product.id,
                    nome: product.nome,
                    descricao: product.descricao,
                    preco: product.preco,
                    imagem: product.imagem,
                    quantidade: qtd,
                    sabores: product.sabores,
                    ehVariado: true,
                    observacao: product.observacao
                };

                // Verificar limite total do carrinho (máximo 30 itens diferentes)
                if (prevCart.length >= 30) {
                    console.warn('Limite de 30 itens diferentes no carrinho atingido');
                    return prevCart;
                }

                return [...prevCart, newItem];
            }

            // Para produtos normais ou com variante única
            const existingItemIndex = prevCart.findIndex(item => {
                // Para produtos com variante, compara id, varianteId e produtoId
                if (product.varianteId && product.produtoId) {
                    return item.varianteId === product.varianteId &&
                        item.produtoId === product.produtoId;
                }
                // Para produtos sem variante, compara apenas o id
                return item.id === product.id;
            });

            if (existingItemIndex >= 0) {
                // Atualizar quantidade se o item já existe
                const updatedCart = [...prevCart];
                const newQuantity = updatedCart[existingItemIndex].quantidade + qtd;

                // ALTERADO: Limite de 50 unidades por item
                if (newQuantity > 50) {
                    console.warn('Limite de 50 unidades por item atingido');
                    return prevCart;
                }

                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantidade: newQuantity
                };
                return updatedCart;
            } else {
                // Verificar limite total do carrinho (máximo 30 itens diferentes)
                if (prevCart.length >= 30) {
                    console.warn('Limite de 30 itens diferentes no carrinho atingido');
                    return prevCart;
                }

                // Adicionar novo item
                const newItem = {
                    id: product.id,
                    nome: product.nome,
                    descricao: product.descricao,
                    preco: product.preco,
                    imagem: product.imagem,
                    quantidade: qtd
                };

                // Adicionar campos extras se existirem
                if (product.varianteNome) newItem.varianteNome = product.varianteNome;
                if (product.varianteId) newItem.varianteId = product.varianteId;
                if (product.produtoId) newItem.produtoId = product.produtoId;
                if (product.observacao) newItem.observacao = product.observacao;

                return [...prevCart, newItem];
            }
        });
    }, [validateCartItem]);

    // Remover item do carrinho
    const removeFromCart = useCallback((productId) => {
        console.log('Removendo item:', productId);
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    // Atualizar quantidade - ALTERADO: limite de 50 unidades
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        // ALTERADO: Limitar a 50 unidades por item
        const finalQuantity = Math.min(50, Math.max(1, quantity));

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantidade: finalQuantity }
                    : item
            )
        );
    }, [removeFromCart]);

    // Limpar carrinho
    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // Definir número da mesa
    const setTable = useCallback((number) => {
        if (!validateTableNumber(number)) {
            console.error('Número de mesa inválido:', number);
            return;
        }

        const tableData = {
            number: parseInt(number),
            timestamp: Date.now()
        };

        setTableNumber(number);
        localStorage.setItem(STORAGE_KEYS.TABLE, JSON.stringify(tableData));
    }, []);

    // Limpar mesa
    const clearTable = useCallback(() => {
        setTableNumber(null);
        localStorage.removeItem(STORAGE_KEYS.TABLE);
    }, []);

    // Incrementar contadores de pedidos
    const incrementOrderCounts = useCallback((cartItems) => {
        try {
            const storedCounts = localStorage.getItem(STORAGE_KEYS.ORDER_COUNTS);
            let orderCounts = storedCounts ? JSON.parse(storedCounts) : {};

            cartItems.forEach(item => {
                const productId = item.id;
                const currentCount = orderCounts[productId] || 0;
                orderCounts[productId] = currentCount + item.quantidade;
            });

            localStorage.setItem(STORAGE_KEYS.ORDER_COUNTS, JSON.stringify(orderCounts));
            window.dispatchEvent(new Event('order_counts_updated'));
        } catch (error) {
            console.error('Erro ao incrementar contadores:', error);
        }
    }, []);

    // Finalizar pedido - AGORA USA getTotal QUE JÁ ESTÁ DEFINIDO
    const checkout = useCallback((orderData) => {
        if (cart.length === 0) {
            throw new Error('Carrinho vazio');
        }

        if (!tableNumber) {
            throw new Error('Número da mesa não definido');
        }

        // Validar todos os itens do carrinho
        for (const item of cart) {
            const validation = validateCartItem(item);
            if (!validation.isValid) {
                throw new Error(`Item inválido no carrinho: ${validation.error}`);
            }
        }

        const orderId = `PED-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

        const order = {
            id: orderId,
            mesa: tableNumber,
            data: new Date().toISOString(),
            itens: [...cart],
            total: getTotal(),
            status: 'pendente'
        };

        console.log('Checkout realizado:', order);

        // Adicionar ao histórico
        setOrderHistory(prev => [order, ...prev.slice(0, 50)]);

        // Salvar histórico
        try {
            const currentHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDER_HISTORY) || '[]');
            const newHistory = [order, ...currentHistory.slice(0, 49)];
            localStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Erro ao salvar histórico:', error);
        }

        // Incrementar contadores
        incrementOrderCounts(cart);

        // Limpar carrinho (mantém a mesa)
        clearCart();

        return order;
    }, [cart, tableNumber, validateCartItem, clearCart, incrementOrderCounts, getTotal]);

    // Função para definir mesa a partir da rota
    const setTableFromRoute = useCallback((tableNum) => {
        const num = parseInt(tableNum);
        if (isNaN(num) || num < 1 || num > 50) return;

        const tableData = {
            number: num,
            timestamp: Date.now()
        };

        setTableNumber(num);
        localStorage.setItem('restaurant_table', JSON.stringify(tableData));
    }, []);

    const value = {
        cart,
        tableNumber,
        orderHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setTable,
        clearTable,
        checkout,
        getTotal,
        isCartEmpty,
        getTotalItems,
        setTableFromRoute
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};