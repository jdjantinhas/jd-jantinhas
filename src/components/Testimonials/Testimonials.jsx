import React, { useRef } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';

// Import do Framer Motion
import { motion } from 'framer-motion';

const Testimonials = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const containerRef = useRef(null);

    // Dados de exemplo para avaliações
    const testimonials = [
        {
            id: 1,
            name: "Maria Silva",
            rating: 5,
            comment: "A melhor jantinha da região! O frango assado é simplesmente divino, sempre muito bem temperado e macio.",
            date: "2 semanas atrás",
            category: "Almoço"
        },
        {
            id: 2,
            name: "Carlos Santos",
            rating: 4,
            comment: "Atendimento rápido e comida de qualidade. A feijoada de sábado é imperdível!",
            date: "1 mês atrás",
            category: "Jantar"
        },
        {
            id: 3,
            name: "Ana Oliveira",
            rating: 5,
            comment: "Sou cliente há anos e nunca me decepcionei. A lasanha é a melhor que já comi na vida!",
            date: "3 dias atrás",
            category: "Especialidades"
        },
        {
            id: 4,
            name: "João Pereira",
            rating: 5,
            comment: "Ambiente familiar e comida caseira como a da vovó. O preço é justo e a qualidade é excepcional.",
            date: "2 meses atrás",
            category: "Almoço"
        },
        {
            id: 5,
            name: "Fernanda Costa",
            rating: 4,
            comment: "Adorei as porções generosas! Levei para a família toda e todos aprovaram. Voltaremos mais vezes!",
            date: "1 semana atrás",
            category: "Família"
        },
        {
            id: 6,
            name: "Ricardo Almeida",
            rating: 5,
            comment: "Como aqui todas as semanas no almoço de trabalho. Pratos variados, sempre frescos e saborosos.",
            date: "5 dias atrás",
            category: "Executivo"
        },
        {
            id: 7,
            name: "Juliana Mendes",
            rating: 5,
            comment: "A entrega sempre chega no horário e quentinha. Meu almoço favorito durante a semana!",
            date: "3 semanas atrás",
            category: "Entrega"
        },
        {
            id: 8,
            name: "Roberto Lima",
            rating: 5,
            comment: "Qualidade excelente e preço justo. Já recomendei para todos os meus colegas de trabalho.",
            date: "1 mês atrás",
            category: "Executivo"
        }
    ];

    // Componente de Card de Avaliação com animação
    const TestimonialCard = ({ testimonial }) => (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Box
                sx={{
                    flex: '0 0 auto',
                    width: isMobile ? '280px' : isTablet ? '350px' : '400px',
                    margin: '0 8px',
                    border: '1px solid rgba(175, 29, 29, 0.3)',
                    borderRadius: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(22, 10, 10, 0.7)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Ícone de aspas */}
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box sx={{ mb: 1 }}>
                            <FormatQuoteIcon
                                sx={{
                                    fontSize: 40,
                                    color: 'rgba(175, 29, 29, 0.3)',
                                    transform: 'rotate(180deg)'
                                }}
                            />
                        </Box>
                    </motion.div>

                    {/* Comentário */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            lineHeight: 1.6,
                            mb: 3,
                            flex: 1,
                            fontStyle: 'italic'
                        }}
                    >
                        "{testimonial.comment}"
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex' }}>
                            {[...Array(5)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <StarIcon
                                        sx={{
                                            fontSize: 20,
                                            color: index < testimonial.rating ? '#af1d1d' : 'rgba(255, 255, 255, 0.3)'
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                ml: 1,
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem'
                            }}
                        >
                            {testimonial.rating}.0
                        </Typography>
                    </Box>

                    {/* Informações do cliente */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                    }}>
                        <Box>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontFamily: '"Libre Baskerville", serif',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        fontSize: { xs: '0.95rem', md: '1rem' },
                                        mb: 0.5
                                    }}
                                >
                                    {testimonial.name}
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {testimonial.date}
                                </Typography>
                            </motion.div>
                        </Box>

                        {/* Categoria */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                    color: '#AF1D1D',
                                    padding: '4px 12px',
                                    borderRadius: '15px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(175, 29, 29, 0.3)'
                                }}
                            >
                                {testimonial.category}
                            </Box>
                        </motion.div>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );

    // Opções do carrossel - CORRIGIDO para mobile
    const emblaOptions = {
        align: 'center', // Mudado para center para melhor visualização no mobile
        loop: true,
        skipSnaps: false,
        containScroll: 'trimSnaps',
        dragFree: false,
        slidesToScroll: 1,
        startIndex: 1, // Começa no segundo slide para melhor visualização
        breakpoints: {
            '(max-width: 600px)': {
                align: 'center',
                slidesToScroll: 1,
                loop: true
            },
            '(min-width: 600px)': {
                align: 'start',
                slidesToScroll: 2
            },
            '(min-width: 900px)': {
                align: 'start',
                slidesToScroll: 3
            },
            '(min-width: 1200px)': {
                align: 'start',
                slidesToScroll: 4
            }
        }
    };

    // Variantes de animação
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const statsVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }
        })
    };

    return (
        <Box
            sx={{
                py: { xs: 6, md: 12 },
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                px: isMobile ? 0 : 2, // Remove padding lateral no mobile
            }}
            ref={containerRef}
        >
            {/* Cabeçalho */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            >
                <Box sx={{
                    textAlign: 'center',
                    mb: { xs: 8, md: 7 },
                    position: 'relative',
                    zIndex: 2,
                    px: isMobile ? 2 : 0, // Adiciona padding apenas no mobile
                }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: '"Libre Baskerville", serif',
                                fontWeight: 700,
                                color: '#AF1D1D',
                                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            O que nossos clientes dizem
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                                maxWidth: '600px',
                                margin: '0 auto',
                                mb: 3,
                                px: isMobile ? 1 : 0,
                            }}
                        >
                            Experiências reais de quem já provou nossos sabores
                        </Typography>
                    </motion.div>

                    {/* Rating geral */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200
                        }}
                    >
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            border: '1px solid rgba(175, 29, 29, 0.2)',
                            cursor: 'default'
                        }}>
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <StarIcon sx={{ color: '#af1d1d', fontSize: 20, mr: 0.5 }} />
                            </motion.div>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#af1d1d',
                                    fontWeight: 'bold',
                                    mr: 1
                                }}
                            >
                                4.8
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }}
                            >
                                Média de 156 avaliações
                            </Typography>
                        </Box>
                    </motion.div>
                </Box>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <Box sx={{
                    mt: { xs: 6, md: 12 },
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: { xs: 3, md: 4 },
                    borderRadius: '20px',
                    border: '1px solid rgba(175, 29, 29, 0.1)',
                    mx: isMobile ? 2 : 'auto',
                    maxWidth: '1200px',
                }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(4, 1fr)'
                        },
                        gap: 3
                    }}>
                        {[
                            { value: '500+', label: 'Clientes Satisfeitos' },
                            { value: '98%', label: 'Recomendação' },
                            { value: '4.8', label: 'Média de Avaliação' },
                            { value: '5 Anos', label: 'de Experiência' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={statsVariants}
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontFamily: '"Libre Baskerville", serif',
                                            color: '#AF1D1D',
                                            fontWeight: 'bold',
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            mb: 1
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            fontSize: { xs: '0.85rem', md: '0.9rem' }
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </motion.div>

            {/* Carrossel de avaliações - CORRIGIDO para mobile */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.7 }}
            >
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '380px' : '350px',
                    mt: 6,
                    mb: 6,
                    px: isMobile ? 1 : 2, // Reduz padding no mobile
                    '& > div': {
                        width: '100%',
                        height: '100%'
                    }
                }}>
                    <EmblaCarousel
                        showControls={true}
                        controlPosition={isMobile ? "bottom-center" : "bottom-center"}
                        controlColor="#AF1D1D"
                        controlBgColor="rgba(22, 10, 10, 0.95)"
                        autoPlayInterval={5000}
                        controlOffset={isMobile ? { x: 0, y: -60 } : { x: -845, y: -75 }}
                        options={emblaOptions}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'stretch',
                                    padding: isMobile ? '0 4px' : '0 8px', // Menos padding no mobile
                                    height: '100%'
                                }}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </EmblaCarousel>
                </Box>
            </motion.div>

            {/* Elementos decorativos */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                animate={{
                    y: [0, -10, 0],
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(175, 29, 29, 0.1) 0%, transparent 70%)',
                    }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                animate={{
                    y: [0, 10, 0],
                    transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '300px',
                    height: '300px',
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
                    }}
                />
            </motion.div>
        </Box>
    );
};

export default Testimonials;