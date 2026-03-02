import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Banner from '../components/BannerLayout/Banner';
import ComboSection from '../components/ComboSection/ComboSection';
import HorizontalScrollCarousel from '../components/HorizontalScrollCarousel/HorizontalScrollCarousel';
import MostOrdered from '../components/MostOrdered/MostOrdered';
import Testimonials from '../components/Testimonials/Testimonials';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigateToCategory = (categoryId) => {
        // Navega para a página do cardápio, passando a categoria no state
        navigate('/cardapio', { state: { scrollToCategory: categoryId } });
    };

    return (
        <>
            <Banner onNavigate={handleNavigateToCategory} />
            <MostOrdered />
            <HorizontalScrollCarousel />
            <Testimonials />
        </>
    );
};

export default Home;