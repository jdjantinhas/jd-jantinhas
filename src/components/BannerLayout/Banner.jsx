import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import BannerSlide from './BannerSlide';

import bannerComida from '../../assets/img/frangopassarinhobanner.png';
import bannerBatata from '../../assets/img/bebidas.png';
import bannerSobremesa from '../../assets/img/sorvetes.png';

const Banner = () => {
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
        },
        {
            id: 2,
            dot: 'Mais Pedido',
            subDot: 'Sugestão do Chef',
            title: 'Bebidas',
            subtitle: 'Refrescantes',
            description: 'Explore nosso cardápio de bebidas refrescantes, perfeitas para acompanhar suas refeições. De sucos naturais a refrigerantes gelados, temos opções para todos os gostos. Venha se refrescar conosco e completar sua experiência gastronômica!',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerBatata,
        },
        {
            id: 3,
            dot: 'Especial',
            subDot: 'Sobremesa da Casa',
            title: 'Sobremesas',
            subtitle: 'Irresistíveis',
            description: 'Explore nosso cardápio repleto de pratos irresistíveis, preparados com ingredientes frescos e sabores autênticos. De clássicos a criações exclusivas, cada mordida é uma experiência gastronômica única. Venha saborear o melhor da culinária conosco!',
            buttonText: 'Ver Opções',
            imageUrl: bannerSobremesa,
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
                        <BannerSlide item={item} />
                    </Box>
                ))}
            </EmblaCarousel>
        </Box>
    );
};

export default Banner;