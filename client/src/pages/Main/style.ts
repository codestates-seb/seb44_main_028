import styled from 'styled-components';
import { IMAGE_SLIDER } from './constants';
import { colorPalette } from '../../common/utils/enum/colorPalette';

export const Container = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  z-index: 1;
`;

export const TopButton = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #12d3cf;
  color: #fff;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #b0f4e6;
    color: #12d3cf;
  }
`;
// Carousel
export const CarouselContainer = styled.div``;
export const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 34.5rem;
`;
export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  & img {
    width: 100%;
    object-fit: cover;
  }
`;
export const SliderButton = styled.div`
  display: flex;
  color: ${colorPalette.whiteColor};
  font-size: 2rem;
  & svg {
    position: absolute;
    top: 45%;
    cursor: pointer;
  }
  & .previous {
    left: 10px;
  }
  & .next {
    right: 10px;
  }
`;
export const SliderDotsWrapper = styled.div`
  display: flex;
  & div {
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;
    transform: translateY(-30px);
    color: #f0f0f0;
    opacity: 0.5;
  }
`;
