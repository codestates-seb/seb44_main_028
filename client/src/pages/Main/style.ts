import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
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
  width: 400vw;
  height: 34.5rem;
`;
