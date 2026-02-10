export const validateTableNumber = (tableNum) => {
    const num = parseInt(tableNum);
    return !isNaN(num) && num > 0 && num <= 50; // Ajuste conforme sua quantidade de mesas
};

export const validateCart = (cartItems) => {
    if (!Array.isArray(cartItems)) return false;

    return cartItems.every(item =>
        item &&
        typeof item.id === 'number' &&
        typeof item.quantidade === 'number' &&
        item.quantidade > 0 &&
        item.quantidade <= 10 // Limite máximo por item
    );
};

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '') // Remove tags HTML
        .trim()
        .substring(0, 500); // Limita tamanho
};

export const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `PED-${timestamp}-${random}`.toUpperCase();
};