import React from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Target, Eye, HeartHandshake } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuração do ícone do marcador (Leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const teamMembers = [
    {
        name: 'Ana Clara Souza',
        role: 'Chef Executiva',
        image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop',
        bio: 'Especialista em gastronomia contemporânea com 15 anos de experiência.',
    },
    {
        name: 'Carlos Mendes',
        role: 'Sommelier',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop',
        bio: 'Paixão por vinhos e harmonizações, certificado pela WSET.',
    },
    {
        name: 'Fernanda Lima',
        role: 'Maitre',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop',
        bio: 'Acolhimento e excelência em serviço há mais de uma década.',
    },
];

const SobreNos = () => {
    // Coordenadas do JD Jantinha's (aproximadas – ajuste se necessário)
    const position = [-16.6869, -49.2648];

    return (
        <Box sx={{ bgcolor: '#0A0A0A' }}>
            {/* ===== HERO – mantido igual ===== */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    flexWrap: 'nowrap',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    width: '100%',
                    px: { xs: 2, md: 4 },
                    py: { xs: 4, md: 8 },
                    minHeight: { xs: 'auto', md: 1200 },
                    background: {
                        xs: 'linear-gradient(130deg, #310609 0%, #0A0A0A 100%)',
                        md: 'none',
                    },
                }}
            >
                {/* FUNDO SVG – somente desktop */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                        overflow: 'hidden',
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 5898 4573"
                        preserveAspectRatio="none"
                        style={{ display: 'block' }}
                    >
                        <defs>
                            <linearGradient id="layer1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#000814" />
                                <stop offset="100%" stopColor="#DC0612" />
                            </linearGradient>
                            <linearGradient id="layer2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#000814" />
                                <stop offset="100%" stopColor="#DC0612" />
                            </linearGradient>
                            <linearGradient id="layer3Gradient" x1="60%" y1="50%" x2="50%" y2="100%">
                                <stop offset="0%" stopColor="#0A0A0A" />
                                <stop offset="100%" stopColor="#0A0A0A" />
                            </linearGradient>
                        </defs>
                        <path d="M3.99986 1974.82V1951.64V-0.000215709L5893 -0.000215709L5893 3174.82V4573L5560.89 3865.13C5363.24 3443.85 4939.85 3174.82 4474.51 3174.82L2600.6 3174.82L1204 3174.82C541.258 3174.82 3.99986 2637.56 3.99986 1974.82Z" fill="url(#layer1Gradient)" />
                        <path d="M2600.6 2895.04L1119.39 2895.04C503.378 2895.04 3.99986 2395.66 3.99986 1779.65V-0.00023973L5893 -0.00023973L5893 2895.04V4170L5571.96 3546.03C5366.29 3146.3 4954.46 2895.04 4504.91 2895.04L2600.6 2895.04Z" fill="url(#layer2Gradient)" />
                        <path d="M2601.43 2664.85L1031.15 2664.85C464.326 2664.85 4.82603 2205.35 4.82603 1638.53V0.999985L5893.83 0.999985L5893.83 2664.85V3838L5581.36 3279.2C5369.25 2899.85 4968.6 2664.85 4533.98 2664.85L2601.43 2664.85Z" fill="url(#layer3Gradient)" fillOpacity="0.9" />
                    </svg>
                </Box>

                {/* Coluna vazia esquerda */}
                <Box sx={{ width: { xs: '0%', md: '10%' }, display: { xs: 'none', md: 'block' }, position: 'relative', zIndex: 2 }} />

                {/* SVG PRINCIPAL */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    sx={{ width: { xs: '100%', md: '30%' }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, position: 'relative', zIndex: 2, mb: { xs: 4, md: 0 } }}
                >
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 475, mt: { xs: 0, md: '22px' } }}>
                        <svg width="100%" height="auto" viewBox="0 0 475 585" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }}>
                            <defs>
                                <clipPath id="clipPath1">
                                    <path d="M70.2943 61.7946C115.303 16.7858 157.348 -2.78232e-06 221 0L221 277.37C221 323.818 202.549 368.363 169.706 401.206C124.697 446.215 63.6519 471.5 -5.11275e-05 471.5L-4.06368e-05 231.5C-3.78545e-05 167.848 25.2856 106.803 70.2943 61.7946Z" />
                                </clipPath>
                                <clipPath id="clipPath2">
                                    <path d="M404.706 522.705C359.697 567.714 317.652 584.5 254 584.5L254 307.13C254 260.682 272.451 216.137 305.294 183.294C350.303 138.285 411.348 113 475 113L475 353C475 416.652 449.714 477.697 404.706 522.705Z" />
                                </clipPath>
                            </defs>
                            <image href="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop" width="475" height="585" preserveAspectRatio="xMidYMid slice" clipPath="url(#clipPath1)" />
                            <image href="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop" width="475" height="585" preserveAspectRatio="xMidYMid slice" clipPath="url(#clipPath2)" />
                        </svg>
                    </Box>
                </Box>

                {/* TEXTO HERO */}
                <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' }, pl: { xs: 0, md: 4 }, position: 'relative', zIndex: 2 }}>
                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <Typography variant="h3" component="h1" sx={{ fontFamily: '"Libre Baskerville", serif', fontWeight: 700, mb: 2, mt: { xs: 0, md: 0, lg: 2 }, background: 'linear-gradient(130deg, #C32020 0%, #5D0F0F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent', display: 'inline-block' }}>
                            Sobre Nós
                        </Typography>
                    </Box>
                    
                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Libre Baskerville", serif', fontWeight: 400, color: '#e5e5e5', mb: 3 }}>
                            Tradição e comida brasileira raiz em cada prato
                        </Typography>
                    </Box>

                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#fff' }}>
                            O JD Jantinha’s é o lugar ideal para quem busca sabor, qualidade e aquele clima agradável no fim do dia.
                            Localizado no Residencial Itaipú, em Goiânia, oferecemos jantinhas caprichadas e pratos preparados com ingredientes selecionados,
                            sempre com aquele tempero especial que conquista nossos clientes.
                        </Typography>
                    </Box>

                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#fff' }}>
                            Com um ambiente acolhedor, mesas externas, brinquedoteca e Wi-Fi disponível, proporcionamos uma experiência completa — seja para reunir a família,
                            encontrar amigos ou simplesmente aproveitar uma boa refeição. Trabalhamos com preços acessíveis e porções bem servidas, mantendo o compromisso com
                            qualidade e bom atendimento.
                        </Typography>
                    </Box>

                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#fff' }}>
                            No JD Jantinha’s, cada detalhe é pensado para que você se sinta em casa.
                            Venha conhecer e descobrir por que somos tão bem avaliados por quem já experimentou!
                        </Typography>
                    </Box>
                    
                    <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#cccccc' }}>
                            Aqui, cada prato conta uma história – e queremos que você faça parte dela.
                        </Typography>
                    </Box>
                </Box>

                {/* Coluna vazia direita */}
                <Box sx={{ width: { xs: '0%', md: '10%' }, display: { xs: 'none', md: 'block' }, position: 'relative', zIndex: 2 }} />
            </Box>

            {/* ===== NOSSA HISTÓRIA ===== */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                sx={{ bgcolor: '#0A0A0A', py: 8, mt: { lg: '-380px', sm: '0px' } }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4" sx={{ fontFamily: '"Libre Baskerville", serif', fontWeight: 600, background: 'linear-gradient(130deg, #C32020 0%, #5D0F0F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
                                Nossa História
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: '#e0e0e0', lineHeight: 1.8 }}>
                                O restaurante nasceu do sonho de dois amigos apaixonados por gastronomia. O que começou como uma pequena casa de almoço rapidamente se tornou referência na cidade, graças ao cuidado com os detalhes e à busca incessante pela excelência.
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#e0e0e0', lineHeight: 1.8 }}>
                                Hoje, mantemos a mesma essência: um ambiente acolhedor, atendimento afetivo e pratos que surpreendem. Nossa cozinha é uma ponte entre o regional e o contemporâneo.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box component={motion.div} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                                <Box component="img" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" alt="Equipe na cozinha" sx={{ width: { xs: '100%', md: '90%' }, maxWidth: 520, borderRadius: '0 60px', boxShadow: '0 12px 30px rgba(0,0,0,0.7)' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ===== MISSÃO, VISÃO, VALORES ===== */}
            <Box sx={{ bgcolor: '#0A0A0A', py: 8 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    sx={{ textAlign: 'center', mb: 6, px: { xs: 2, md: 0 } }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontWeight: 600,
                            background: 'linear-gradient(130deg, #C32020 0%, #5D0F0F 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block'
                        }}
                    >
                        Missão, Visão e Valores
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        gap: { xs: 2, md: 4 },
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, md: 0 }
                    }}
                >
                    {/* MISSÃO */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -8 }}
                        sx={{
                            flex: { xs: '1 1 280px', md: '1 1 0' },
                            minWidth: '280px',
                            textAlign: 'center',
                            p: 3,
                            borderRadius: '40px',
                            bgcolor: '#121212',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(195,32,32,0.5)'
                            }
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <Target size={60} color="#C32020" strokeWidth={1.5} />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                            Missão
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            Oferecer experiências gastronômicas memoráveis, combinando sabor,
                            qualidade e acolhimento em cada jantinha servida.
                        </Typography>
                    </Box>

                    {/* VISÃO */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -8 }}
                        sx={{
                            flex: { xs: '1 1 280px', md: '1 1 0' },
                            minWidth: '280px',
                            textAlign: 'center',
                            p: 3,
                            borderRadius: '40px',
                            bgcolor: '#121212',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(139,26,26,0.5)'
                            }
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <Eye size={60} color="#C32020" strokeWidth={1.5} />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                            Visão
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            Ser referência em comida caseira e jantinhas na região, reconhecida
                            pela excelência, inovação e pelo carinho no atendimento.
                        </Typography>
                    </Box>

                    {/* VALORES */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -8 }}
                        sx={{
                            flex: { xs: '1 1 280px', md: '1 1 0' },
                            minWidth: '280px',
                            textAlign: 'center',
                            p: 3,
                            borderRadius: '40px',
                            bgcolor: '#121212',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(165,42,42,0.5)'
                            }
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <HeartHandshake size={60} color="#C32020" strokeWidth={1.5} />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                            Valores
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            Tradição, respeito aos ingredientes, hospitalidade genuína e
                            compromisso inabalável com a satisfação de quem nos visita.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={6} alignItems="stretch" sx={{ px: { xs: 2, md: 12 }, pb: 6 }}>
                {/* ESQUERDA — CARD COMPLETO */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box
                        sx={{
                            height: '100%',
                            bgcolor: '#121212',
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* IMAGEM COM EFEITO */}
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src="src/assets/img/fachada.webp"
                                alt="Fachada do restaurante"
                                sx={{
                                    width: '100%',
                                    height: 300,
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease, filter 0.6s ease',
                                    filter: 'brightness(0.85)',
                                    transform: 'scale(1.18)',
                                    '&:hover': {
                                        transform: 'scale(1.38)',
                                        filter: 'brightness(1.12)',
                                    },
                                }}
                            />

                            {/* Overlay suave */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0.2))',
                                    pointerEvents: 'none',
                                }}
                            />
                        </Box>

                        {/* INFORMAÇÕES */}
                        <Box sx={{ p: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#fff',
                                    backgroundColor: '#212529',
                                    borderRadius: '0 0 30px 30px',
                                    mb: 2,
                                    p: 2,
                                }}
                            >
                                Informações
                            </Typography>

                            <Box sx={{ p: 2, mb: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#ccc',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <LocationOnIcon sx={{ color: '#C32020', fontSize: 22 }} />
                                    Residencial Itaipú, Goiânia - GO
                                </Typography>

                                <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                                    Funcionamento: Segunda a Sábado, das 19:00h às 23:30h.
                                </Typography>

                                <Typography variant="body2" sx={{ color: '#ccc' }}>
                                    Faça sua reserva pelo telefone (62) 99280-2125.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* DIREITA — MAPA */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            height: '100%',
                            minHeight: 450,
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1909.8611924117783!2d-49.365549767528556!3d-16.7904819820936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef90ae6862ced%3A0xbd8cddc0ac01c62d!2sJD%20JANTINHA&#39;S!5e0!3m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="JD Jantinha's"
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Box
                        sx={{
                            height: '100%',
                            minHeight: 450,
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1909.8611924117783!2d-49.365549767528556!3d-16.7904819820936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef90ae6862ced%3A0xbd8cddc0ac01c62d!2sJD%20JANTINHA&#39;S!5e0!3m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="JD Jantinha's"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SobreNos;