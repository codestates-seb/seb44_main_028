import React, { useState } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { SliderWrapper, SliderButton, SliderDotsWrapper } from '../style';
import { IMAGE_SLIDER } from '../constants';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <SliderWrapper>
      <SliderButton>
        <div>
          <MdOutlineChevronLeft className="previous" />
        </div>
        <div>
          <MdOutlineChevronRight className="next" />
        </div>
      </SliderButton>
      <img src={IMAGE_SLIDER[currentIndex].image}></img>
      <SliderDotsWrapper>
        {IMAGE_SLIDER.map((_, index) => (
          <div key={index}>●</div>
        ))}
      </SliderDotsWrapper>
    </SliderWrapper>
  );
};

export default ImageSlider;
