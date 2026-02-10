import React from 'react';
import { Box } from '@mui/material';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import BannerSlide from './BannerSlide';

import bannerComida from '../../assets/img/Banner1.png';
import bannerBatata from '../../assets/img/Banner2.png';

const Banner = () => {
    const bannerItems = [
        {
            id: 1,
            title: 'Comida',
            subtitle: 'Deliciosa',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerComida,
        },
        {
            id: 2,
            title: 'Bebidas',
            subtitle: 'Refrescantes',
            buttonText: 'Ver Cardápio',
            imageUrl: bannerBatata,
        },
        {
            id: 3,
            title: 'Sobremesas',
            subtitle: 'Irresistíveis',
            buttonText: 'Ver Opções',
            imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&auto=format&fit=crop',
        }
    ];

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
                controlOffset={{ x: 40, y: 55 }}
                controlColor="#C32020"
                controlBgColor="rgba(22, 10, 10, 0.9)"
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
                            height: '500px',
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