import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import BannerSlide from './BannerSlide';

import bannerComida from '../../assets/img/frangopassarinhobanner.png';
import bannerBatata from '../../assets/img/bebidas.png';
import bannerEspetinhos from '../../assets/img/bannerespetinhos.png';

const Banner = ({ onNavigate }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Apenas mobile
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Apenas tablet

    const bannerItems = [
        {
            id: 1,
            dot: 'Novo',
            subDot: 'No Cardápio',
            title: 'Frango a Passarinho',
            subtitle: 'Peça agora mesmo',
            description: 'Porção irresistível de frango a passarinho, crocante por fora e suculento por dentro. Perfeita para compartilhar ou saborear sozinho. Venha experimentar essa delícia que conquistou o paladar de todos!',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerComida,
            categoryId: 'combos'
        },
        {
            id: 2,
            dot: 'Mais Pedido',
            subDot: 'Sugestão do Chef',
            title: 'Bebidas',
            subtitle: 'Refrescantes',
            description: 'Veja nosso cardápio de bebidas refrescantes, perfeitas para acompanhar suas refeições. De sucos naturais a refrigerantes gelados, temos opções para todos os gostos. Venha se refrescar conosco e completar sua experiência gastronômica!',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerBatata,
            categoryId: 'cervejas'
        },
        {
            id: 3,
            dot: 'Especial',
            subDot: 'Espetinhos',
            title: 'Espetinhos',
            subtitle: 'Irresistíveis',
            description: 'Deliciosos espetinhos! Venha experimentar essa delícia que conquistou o paladar de todos!',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerEspetinhos,
            categoryId: 'espetinhos'
        }
    ];

    // Define offset baseado no dispositivo
    const getControlOffset = () => {
        if (isMobile) return { x: 20, y: 105 }; // Mobile
        if (isTablet) return { x: 20, y: 130 }; // Tablet
        return { x: 40, y: 35 }; // Desktop
    };

    return (
        <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '650px'
        }}>
            <EmblaCarousel
                showControls={true}
                controlPosition="bottom-left"
                autoPlayDelay={5000}
                controlOffset={getControlOffset()}
                controlColor="#C32020"
                controlBgColor="rgba(22, 10, 10, 1)"
                useAutoplayPlugin={true}
                options={{
                    loop: true,
                    align: 'start'
                }}
            >
                {bannerItems.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            flex: '0 0 100%',
                            minWidth: 0,
                            height: '550px',
                            position: 'relative'
                        }}
                    >
                        <BannerSlide 
                            item={item} 
                            key={item}
                            onNavigate={item.categoryId ? () => onNavigate(item.categoryId) : null}
                        />
                    </Box>
                ))}
            </EmblaCarousel>
        </Box>
    );
};

export default Banner;