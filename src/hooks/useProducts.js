import { useState, useEffect, useCallback } from 'react';
import productsData from '../data/products.json';

const STORAGE_KEYS = {
    ORDER_COUNTS: 'restaurant_order_counts',
    MOST_ORDERED: 'restaurant_most_ordered'
};

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mostOrdered, setMostOrdered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Função para carregar e calcular os mais pedidos
    const loadAndCalculateMostOrdered = useCallback(() => {
        try {
            const storedCounts = localStorage.getItem(STORAGE_KEYS.ORDER_COUNTS);
            const orderCounts = storedCounts ? JSON.parse(storedCounts) : {};

            // Atualizar produtos com contadores
            const updatedProducts = productsData.products.map(product => ({
                ...product,
                orderCount: orderCounts[product.id] || 0
            }));

            // Calcular mais pedidos (top 5)
            const sortedMostOrdered = [...updatedProducts]
                .sort((a, b) => b.orderCount - a.orderCount)
                .slice(0, 5);

            // Salvar em localStorage para persistência
            localStorage.setItem(STORAGE_KEYS.MOST_ORDERED, JSON.stringify(sortedMostOrdered));

            setProducts(updatedProducts);
            setMostOrdered(sortedMostOrdered);

            console.log('Mais pedidos atualizados:', sortedMostOrdered);
        } catch (error) {
            console.error('Erro ao carregar/calcular mais pedidos:', error);
        }
    }, []);

    // Carregar dados iniciais
    useEffect(() => {
        try {
            // Configurar categorias
            setCategories(productsData.categories);

            // Carregar e calcular mais pedidos
            loadAndCalculateMostOrdered();

            setIsLoading(false);

            // Escutar eventos de atualização
            const handleOrderCountsUpdated = () => {
                console.log('Evento de atualização recebido, recalculando...');
                loadAndCalculateMostOrdered();
            };

            window.addEventListener('order_counts_updated', handleOrderCountsUpdated);

            return () => {
                window.removeEventListener('order_counts_updated', handleOrderCountsUpdated);
            };
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setIsLoading(false);
        }
    }, [loadAndCalculateMostOrdered]);

    // Obter produtos por categoria
    const getProductsByCategory = useCallback((categoryId) => {
        return products.filter(product => product.categoria === categoryId);
    }, [products]);

    // Obter produto por ID
    const getProductById = useCallback((productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.warn(`Produto com ID ${productId} não encontrado`);
            return null;
        }
        return product;
    }, [products]);

    return {
        products,
        categories,
        mostOrdered,
        isLoading,
        getProductsByCategory,
        getProductById,
        // Removemos incrementOrderCount - agora isso é feito no checkout
        refreshMostOrdered: loadAndCalculateMostOrdered
    };
};