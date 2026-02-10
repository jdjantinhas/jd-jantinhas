import { Box, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const BannerSlide = ({ item }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                minHeight: '600px',
                padding: { xs: 0, md: 8 },
                margin: '20px',
                borderRadius: '60px',
                backgroundImage: `linear-gradient(to right, rgba(108, 22, 22, 0.1) 0%, rgba(108, 22, 22, 0.1) 50%, rgba(108, 22, 22, 0.1) 100%), url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gradiente overlay para melhor legibilidade */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(63, 9, 9, 0.4) 0%, rgba(108, 22, 22, 0.1) 100%)',
                    zIndex: 1,
                }}
            />

            {/* Conteúdo à esquerda */}
            <Box
                sx={{
                    flex: 1,
                    padding: { xs: 2, md: 4},
                    textAlign: { xs: 'center', md: 'left' },
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '3rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        mb: 1,
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: '"Libre Baskerville", serif',
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 4,
                        color: '#FFFFFF',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {item.subtitle}
                </Typography>

                {/* Botão com borda gradiente vermelha */}
                <Box sx={{ display: 'inline-block' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            fontFamily: '"Libre Baskerville", serif',
                            fontSize: '1.2rem',
                            padding: '15px 20px',
                            borderRadius: '50px',
                            border: '3px solid transparent',
                            background: `
                                linear-gradient(transparent, transparent) padding-box,
                                linear-gradient(135deg, #AF1D1D, #FF6B6B) border-box
                            `,
                            color: '#FFF',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                border: '3px solid transparent',
                                background: `
                                    linear-gradient(rgba(175, 29, 29, 0.1), rgba(175, 29, 29, 0.1)) padding-box,
                                    linear-gradient(135deg, #AF1D1D, #FF6B6B) border-box
                                `,
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 20px rgba(175, 29, 29, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                            textTransform: 'capitalize',
                        }}
                    >
                        {item.buttonText.replace('→', '').trim()}
                    </Button>
                </Box>
            </Box>

            {/* Espaço à direita para manter o layout flex */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'block' },
                    padding: { xs: 2, md: 4 },
                    position: 'relative',
                    zIndex: 2,
                }}
            />
        </Box>
    );
};

export default BannerSlide;