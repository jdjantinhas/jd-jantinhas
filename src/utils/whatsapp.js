import { RESTAURANT_CONFIG } from '../config';

export const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `PED-${timestamp}-${random}`.toUpperCase();
};

export const formatOrderMessage = (cart, tableNumber, orderId) => {
    // Sanitiza os dados antes de enviar
    const sanitize = (str) => {
        if (typeof str !== 'string') return '';
        return str.replace(/[^\w\s.,-áéíóúãõâêîôûàèìòùçñ\s]/gi, '');
    };

    let message = `*NOVO PEDIDO - ${RESTAURANT_CONFIG.name.toUpperCase()}*\n\n`;
    message += `*Mesa:* ${tableNumber}\n`;
    message += `*ID do Pedido:* ${orderId}\n`;
    message += `*Data:* ${new Date().toLocaleString('pt-BR')}\n`;
    message += `\n*ITENS DO PEDIDO:*\n`;
    message += `═`.repeat(30) + `\n`;

    cart.forEach((item, index) => {
        message += `\n${index + 1}. *${sanitize(item.nome)}*\n`;
        message += `   ${item.quantidade}x R$ ${item.preco.toFixed(2)}\n`;
        message += `   Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    });

    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    message += `\n\n${'═'.repeat(30)}\n`;
    message += `*VALOR TOTAL: R$ ${total.toFixed(2)}*\n`;
    message += `${'═'.repeat(30)}\n\n`;
    message += `*Local:* ${RESTAURANT_CONFIG.name}\n`;
    message += `*Telefone:* ${RESTAURANT_CONFIG.phone}\n`;
    message += `*Horário:* ${RESTAURANT_CONFIG.operatingHours}\n\n`;
    message += `_Pedido gerado via sistema._`;

    return {
        raw: message,
        encoded: encodeURIComponent(message)
    };
};

export const sendToWhatsApp = (cart, tableNumber, orderId, phoneNumber = RESTAURANT_CONFIG.whatsappNumber) => {
    if (!cart.length || !tableNumber) {
        console.error('Dados inválidos para WhatsApp');
        return {
            success: false,
            error: 'Dados inválidos',
            type: 'validation'
        };
    }

    const message = formatOrderMessage(cart, tableNumber, orderId);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message.encoded}`;

    // Tenta abrir o WhatsApp
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Verifica se a janela foi aberta (pode ser bloqueada por pop-up blockers)
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        return {
            success: false,
            error: 'Popup bloqueado',
            type: 'popup_blocked',
            message: message.raw,
            url: whatsappUrl
        };
    }

    return {
        success: true,
        url: whatsappUrl,
        message: message.raw
    };
};

// Função para copiar mensagem para área de transferência
export const copyOrderToClipboard = async (cart, tableNumber, orderId) => {
    try {
        const message = formatOrderMessage(cart, tableNumber, orderId);

        // Usa a API de Clipboard moderna
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(message.raw);
            return { success: true, message: 'Pedido copiado para área de transferência!' };
        } else {
            // Fallback para método antigo
            const textArea = document.createElement('textarea');
            textArea.value = message.raw;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return { success: true, message: 'Pedido copiado para área de transferência!' };
        }
    } catch (error) {
        console.error('Erro ao copiar:', error);
        return {
            success: false,
            message: 'Erro ao copiar. Tente novamente.'
        };
    }
};