import React from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import {
  SliderWrapper,
  SliderButton,
  SliderImageWrapper,
  SliderDotsWrapper,
} from '../style';

const ImageSlider = () => {
  return (
    <SliderWrapper>
      <SliderButton>
        <div>
          <MdOutlineChevronLeft />
        </div>
        <div>
          <MdOutlineChevronRight />
        </div>
      </SliderButton>
      <SliderImageWrapper></SliderImageWrapper>
      <SliderDotsWrapper></SliderDotsWrapper>
    </SliderWrapper>
  );
};

export default ImageSlider;
