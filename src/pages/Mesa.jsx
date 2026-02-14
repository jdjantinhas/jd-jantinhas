import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Button, CircularProgress } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Mesa = () => {
    const { mesaId } = useParams();
    const navigate = useNavigate();
    const { setTable, tableNumber } = useCart();

    useEffect(() => {
        console.log('Mesa.jsx: mesaId recebido:', mesaId);
        console.log('Mesa.jsx: tableNumber atual:', tableNumber);

        // Valida e define a mesa
        if (mesaId && !isNaN(mesaId) && mesaId > 0 && mesaId <= 50) {
            const mesaNum = parseInt(mesaId);

            console.log('Mesa.jsx: Definindo mesa:', mesaNum);

            if (tableNumber !== mesaNum) {
                setTable(mesaNum);
                console.log('Mesa.jsx: setTable chamado para mesa:', mesaNum);
            } else {
                console.log('Mesa.jsx: Mesa já está definida como', mesaNum);
            }

            // Redireciona para o cardápio após 1 segundo
            console.log('Mesa.jsx: Iniciando timer para redirecionar...');
            const timer = setTimeout(() => {
                console.log('Mesa.jsx: Redirecionando para /cardapio');
                navigate('/cardapio');
            }, 1000);

            return () => {
                console.log('Mesa.jsx: Limpando timer');
                clearTimeout(timer);
            };
        } else {
            // Número de mesa inválido, volta para home
            console.error('Mesa.jsx: Número de mesa inválido:', mesaId);
            navigate('/');
        }
    }, [mesaId, navigate, setTable, tableNumber]);

    return (
        <Container maxWidth="xl" sx={{
            minHeight: '100vh',
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            background: 'linear-gradient(-130deg, #3f0a0aff 0%, #0A0403 9%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <RestaurantIcon sx={{ fontSize: 80, color: '#AF1D1D', mb: 3 }} />

            <Typography
                variant="h2"
                sx={{
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                    color: '#af1d1d'
                }}
            >
                Mesa {mesaId}
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '600px'
                }}
            >
                Bem-vindo ao JD Jantinhas! Redirecionando para o cardápio...
            </Typography>

            <CircularProgress sx={{ color: '#AF1D1D', mb: 4 }} />

            <Button
                variant="contained"
                onClick={() => {
                    console.log('Mesa.jsx: Clique no botão, navegando para /cardapio');
                    navigate('/cardapio');
                }}
                sx={{
                    backgroundColor: '#AF1D1D',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                        backgroundColor: '#8a1818'
                    }
                }}
            >
                Ir para o Cardápio Agora
            </Button>
        </Container>
    );
};

export default Mesa;