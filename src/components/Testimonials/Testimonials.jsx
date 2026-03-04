import React, { useRef } from 'react';
import {
    Box,
    Typography,
    keyframes
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import { motion } from 'framer-motion';

// Animações CSS
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const floatReverse = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
`;

const Testimonials = () => {
    const containerRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: "Noeli Richter",
            rating: 5,
            comment: "Ambiente agradável e familiar. Comida boa, ótimo custo benefício. Recomendo! 😊",
            date: "Um mês atrás",
            category: "Jantinha"
        },
        {
            id: 2,
            name: "Adna Nascimento",
            rating: 4,
            comment: "Simplesmente espetacular! A jantinha é bem servida, com tudo muito saboroso, mas o destaque mesmo vai para o feijão tropeiro, que é de outro nível!",
            date: "1 mês atrás",
            category: "Jantinha"
        },
        {
            id: 3,
            name: "Darley Lima",
            rating: 5,
            comment: "Tava procurando alguma coisa boa perto de casa achei eles no Google fiz pedido pra mim e pra minha família achei tudo muito gostoso rápido atendimento top virei cliente tudo delicioso quentinha e rápido",
            date: "3 dias atrás",
            category: "Jantinha"
        },
        {
            id: 4,
            name: "Cleumarcio Santos",
            rating: 5,
            comment: "Top demais, atendimento excelente, a comida nota 10, feita na hora.. muito bom...",
            date: "2 meses atrás",
            category: "Jantinha"
        },
        {
            id: 5,
            name: "Fernanda Costa",
            rating: 4,
            comment: "Muito bom o atendimento! E a comida top tem um torresmo espetacular eu e minha esposa quando pensamos em Jantinha é JD",
            date: "5 anos atrás",
            category: "Jantinha"
        },
        {
            id: 6,
            name: "Lara Lopes",
            rating: 5,
            comment: "Ótimo atendimento! Excelente feijão tropeiro! Um dos melhores que já comi em Goiânia!",
            date: "Um ano atrás",
            category: "Jantinha"
        },
        {
            id: 7,
            name: "Claúdia Isabella",
            rating: 5,
            comment: "Eu amei tudo, jatinha gostosa, espetinhos quietinhos, atendimento excelente!!! Local limpo. Parabéns!!!",
            date: "2 semanas atrás",
            category: "Jantinha"
        }
    ];

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
                    // Largura responsiva com breakpoints
                    width: {
                        xs: '280px',
                        sm: '350px',
                        md: '400px'
                    },
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
                    {/* Ícone com rotação no hover via CSS */}
                    <Box
                        sx={{
                            mb: 1,
                            '&:hover': {
                                transform: 'rotate(180deg)',
                                transition: 'transform 0.5s',
                            },
                        }}
                    >
                        <FormatQuoteIcon
                            sx={{
                                fontSize: 40,
                                color: 'rgba(175, 29, 29, 0.3)',
                                transform: 'rotate(180deg)'
                            }}
                        />
                    </Box>

                    <Typography
                        variant="body1"
                        component="p"
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

                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex' }}>
                            {[...Array(5)].map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        animation: `scaleIn 0.5s ${index * 0.1}s both`,
                                        '@keyframes scaleIn': {
                                            '0%': { transform: 'scale(0)' },
                                            '100%': { transform: 'scale(1)' },
                                        },
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                            transition: 'transform 0.2s',
                                        },
                                    }}
                                >
                                    <StarIcon
                                        sx={{
                                            fontSize: 20,
                                            color: index < testimonial.rating ? '#af1d1d' : 'rgba(255, 255, 255, 0.3)'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{
                                ml: 1,
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem'
                            }}
                        >
                            {testimonial.rating}.0
                        </Typography>
                    </Box>

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
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{
                                    fontFamily: '"Libre Baskerville", serif',
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    mb: 0.5,
                                    animation: 'slideIn 0.6s 0.2s both',
                                    '@keyframes slideIn': {
                                        '0%': { transform: 'translateX(-20px)', opacity: 0 },
                                        '100%': { transform: 'translateX(0)', opacity: 1 },
                                    },
                                }}
                            >
                                {testimonial.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                component="span"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '0.8rem',
                                    animation: 'slideIn 0.6s 0.3s both',
                                }}
                            >
                                {testimonial.date}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                backgroundColor: 'rgba(175, 29, 29, 0.2)',
                                color: '#AF1D1D',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                border: '1px solid rgba(175, 29, 29, 0.3)',
                                animation: 'scaleIn 0.5s 0.4s both',
                                transition: 'transform 0.2s, rotate 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1) rotate(5deg)',
                                },
                                '&:active': {
                                    transform: 'scale(0.95)',
                                },
                            }}
                        >
                            {testimonial.category}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );

    const emblaOptions = {
        align: 'center',
        loop: true,
        skipSnaps: false,
        containScroll: 'trimSnaps',
        dragFree: false,
        slidesToScroll: 1,
        startIndex: 1,
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

    // Variants para Framer Motion (apenas para animações de entrada)
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
                px: { xs: 0, sm: 2 }, // sem isMobile
            }}
            ref={containerRef}
        >
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
                    px: { xs: 2, md: 0 },
                }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Typography
                            variant="h2"
                            component="h2"
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
                            component="p"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                                maxWidth: '600px',
                                margin: '0 auto',
                                mb: 3,
                                px: { xs: 1, md: 0 },
                            }}
                        >
                            Experiências reais de quem já provou nossos sabores
                        </Typography>
                    </motion.div>

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
                            <Box
                                sx={{
                                    animation: `${rotate} 10s linear infinite`,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <StarIcon sx={{ color: '#af1d1d', fontSize: 20, mr: 0.5 }} />
                            </Box>
                            <Typography
                                variant="h6"
                                component="span"
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
                                component="span"
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
                    mx: { xs: 2, md: 'auto' },
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
                            { value: '4.5', label: 'Média de Avaliação' },
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
                                        component="div"
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
                                        component="p"
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

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.7 }}
            >
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    // Altura responsiva sem useMediaQuery
                    height: { xs: '380px', md: '350px' },
                    mt: 6,
                    mb: 6,
                    px: { xs: 1, md: 2 },
                    '& > div': {
                        width: '100%',
                        height: '100%'
                    }
                }}>
                    <EmblaCarousel
                        showControls={true}
                        controlPosition="bottom-center" // pode ser fixo ou responsivo, mas ajustaremos
                        controlColor="#AF1D1D"
                        controlBgColor="rgba(22, 10, 10, 0.95)"
                        autoPlayInterval={5000}
                        controlOffset={{ xs: { x: 0, y: -60 }, md: { x: -845, y: -75 } }} // isso ainda usa JS, mas podemos definir via props do EmblaCarousel, que aceita objeto com breakpoints?
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
                                    padding: { xs: '0 4px', md: '0 8px' },
                                    height: '100%'
                                }}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </EmblaCarousel>
                </Box>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
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
                        animation: `${float} 3s infinite ease-in-out`,
                    }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
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
                        animation: `${floatReverse} 4s infinite ease-in-out`,
                    }}
                />
            </motion.div>
        </Box>
    );
};

export default Testimonials;