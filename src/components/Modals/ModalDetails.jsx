import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import { X } from 'lucide-react';

/**
 * Modal para exibir detalhes do produto (imagem, título, descrição)
 * @param {Object} props
 * @param {boolean} props.open - Controla abertura do modal
 * @param {Function} props.onClose - Função para fechar
 * @param {Object} props.produto - Produto selecionado
 */
const ModalDetails = ({ open, onClose, produto }) => {
    if (!produto) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#1A1A1A',
                    borderRadius: '30px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    position: 'relative'
                }
            }}
        >
            {/* Botão de fechar circular */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    zIndex: 10,
                    '&:hover': {
                        backgroundColor: 'rgba(175,29,29,0.2)',
                        transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease',
                }}
            >
                <X size={20} />
            </IconButton>

            {/* Imagem em destaque */}
            <Box
                component="img"
                src={produto.imagem || '/placeholder-image.png'}
                alt={produto.nome}
                sx={{
                    width: '100%',
                    height: 350,
                    objectFit: 'cover',
                }}
            />

            <DialogContent sx={{ backgroundColor: '#1A1A1A', color: 'white', py: 3 }}>
                {/* Título */}
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontWeight: 700,
                        color: '#AF1D1D',
                        mb: 1
                    }}
                >
                    {produto.nome}
                </Typography>

                {/* Descrição */}
                <Typography
                    variant="body1"
                    sx={{
                        color: '#CCC',
                        lineHeight: 1.6,
                        fontSize: '1rem'
                    }}
                >
                    {produto.descricao || 'Sem descrição disponível.'}
                </Typography>

                {/* Preço (opcional, se quiser exibir) */}
                {produto.preco > 0 && (
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFD700',
                            mt: 2,
                            fontWeight: 600
                        }}
                    >
                        R$ {produto.preco.toFixed(2)}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetails;