import React from 'react';
import { Box, Typography } from '@mui/material';
import Banner from '../components/BannerLayout/Banner';
import ComboSection from '../components/ComboSection/ComboSection';
import HorizontalScrollCarousel from '../components/HorizontalScrollCarousel/HorizontalScrollCarousel';
import MostOrdered from '../components/MostOrdered/MostOrdered';
import Testimonials from '../components/Testimonials/Testimonials';

const Home = () => {
    return (
        <>
            <Banner />
            <MostOrdered />
            <HorizontalScrollCarousel />
            <Testimonials />
        </>
    );
};

export default Home;