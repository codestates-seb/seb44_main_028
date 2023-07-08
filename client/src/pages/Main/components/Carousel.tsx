import React from 'react';
import ImageSlider from './ImageSlider';
import { CarouselContainer, ImageSliderWrapper } from '../style';

const Carousel = () => {
  return (
    <CarouselContainer>
      <ImageSliderWrapper>
        <ImageSlider />
      </ImageSliderWrapper>
    </CarouselContainer>
  );
};

export default Carousel;
