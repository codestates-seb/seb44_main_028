import React, { useEffect, useState } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { SliderWrapper, SliderButton, SliderDotsWrapper } from '../style';
import { IMAGE_SLIDER } from '../constants';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleGoToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? IMAGE_SLIDER.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const handleGoToNext = () => {
    const isLastSlide = currentIndex === IMAGE_SLIDER.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGoToNext();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex]);
  return (
    <SliderWrapper>
      <SliderButton>
        <div>
          <MdOutlineChevronLeft
            onClick={handleGoToPrevious}
            className="previous"
          />
        </div>
        <div>
          <MdOutlineChevronRight onClick={handleGoToNext} className="next" />
        </div>
      </SliderButton>
      <img
        src={IMAGE_SLIDER[currentIndex].image}
        alt={IMAGE_SLIDER[currentIndex].name}
      ></img>
      <SliderDotsWrapper>
        {IMAGE_SLIDER.map((_, index) => (
          <div key={index} onClick={() => goToSlide(index)}>
            ●
          </div>
        ))}
      </SliderDotsWrapper>
    </SliderWrapper>
  );
};

export default ImageSlider;
