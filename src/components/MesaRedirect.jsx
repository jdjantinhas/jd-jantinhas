import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MesaRedirect = () => {
    const { mesaId } = useParams();

    useEffect(() => {
        console.log('MesaRedirect: Redirecionando para mesa', mesaId);

        if (!mesaId || isNaN(mesaId) || mesaId < 1 || mesaId > 50) {
            window.location.href = '/';
            return;
        }

        // Salva a mesa no localStorage
        localStorage.setItem('restaurant_table', JSON.stringify({
            number: parseInt(mesaId),
            timestamp: Date.now()
        }));

        console.log('Mesa salva no localStorage, redirecionando...');

        // Redireciona IMEDIATAMENTE para o cardápio
        window.location.href = '/cardapio';
    }, [mesaId]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#0A0403',
            color: 'white',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h2>Redirecionando para o cardápio da Mesa {mesaId}...</h2>
            <p>Por favor, aguarde.</p>
        </div>
    );
};

export default MesaRedirect;