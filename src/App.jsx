import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import SobreNos from './pages/SobreNos';
import Contato from './pages/Contato';
import Carrinho from './pages/Carrinho';
import MesaRedirect from './components/MesaRedirect';
import { Box } from '@mui/material';
import './App.css';
import Footer from './components/Footer/Footer';
import QRCodeGenerator from './components/QRGenerator.jsx';

function App() {
  return (
    <Router>
      <CartProvider>
        <Box sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to top, #0A0403 0%, #0A0403 2%)',
          overflowX: 'hidden',
          color: 'white'
        }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/carrinho" element={<Carrinho />} />
            {/* Rota simples que só redireciona */}
            <Route path="/mesa/:mesaId" element={<MesaRedirect />} />
            
            {/* rota interna pra gerar QR */}
            <Route path="/gerar-qrcode" element={<QRCodeGenerator />} />
          </Routes>
        </Box>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;