import styled from 'styled-components';
import { IMAGE_SLIDER } from './constants';
import { colorPalette } from '../../common/utils/enum/colorPalette';

export const MainPageContainer = styled.div`
  height: 300vh;
`;

// Carousel
export const CarouselContainer = styled.div`
  padding-top: 4.5rem;
`;
export const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 28rem;
`;
export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  & img {
    width: 100%;
    height: 399px;
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
