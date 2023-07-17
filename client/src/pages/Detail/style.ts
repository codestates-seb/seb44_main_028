import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fontSize } from '../../common/utils/enum/fontSize';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { border } from '../../common/utils/enum/border';
import Slider from 'react-slick';

export const ItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${fontSize.basic};
  margin-top: 5rem;
`;
export const ItemInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 33.75rem;
  width: 100%;
  margin-bottom: 5rem;
`;
export const ItemImageWrapper = styled.div`
  & img {
    width: 49.5rem;
    height: 33.75rem;
  }
  margin-right: 3rem;
`;
export const ItemUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & .rate {
    margin-top: 1.438rem;
    margin-bottom: 1.75rem;
    color: ${colorPalette.detailPageGrayColor};
  }
`;
export const ItemRate = styled.div`
  margin-left: 1rem;
`;
export const ItemActionBtn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.938rem;
`;
export const ItemDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ProductInfo = styled.div`
  display: flex;
  & div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18.063rem;
    height: 4.25rem;
    font-size: ${fontSize.cardTitle};
    border: ${border.basic};
    border-bottom: none;
    color: ${colorPalette.detailProductInfoColor};
    font-weight: bold;
  }
  & div:last-child {
    width: 100%;
    border-bottom: ${border.basic};
  }
`;
export const ProductDescription = styled.div`
  padding: 0 5.563rem;
`;
export const ProductTitle = styled.div`
  margin-top: 5.563rem;
  margin-bottom: 5.25rem;
  font-size: ${fontSize.detailProductTitleSize};
  font-weight: 500;
`;
export const ProductContent = styled.div`
  font-size: ${fontSize.cardTitle};
`;
export const ProductNotice = styled.div`
  margin-top: 5.75rem;
  color: ${colorPalette.detailPageGrayColor};
`;
export const ProductBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10.438rem;
  & div {
    cursor: pointer;
    margin-left: 2.25rem;
    color: ${colorPalette.detailPageGrayColor};
  }
`;

export const ProductView = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & div {
    font-size: ${fontSize.small};
    color: ${colorPalette.detailPageGrayColor};
  }
`;
export const ItemUserInfoContainer = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
`;
export const ItemUserProfile = styled.div`
  & img {
    width: 4.875rem;
    height: 4.875rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;
export const ItemUserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & h5 {
    font-size: ${fontSize.headerNavText};
    margin-bottom: 0.4rem;
  }
  & p {
    color: ${colorPalette.detailPageGrayColor};
  }
`;
export const ItemPriceContainer = styled.div`
  display: flex;
  & div:first-child {
    color: ${colorPalette.detailPageGrayColor};
    width: 7.125rem;
    border-right: 2px solid ${colorPalette.detailLineColor};
    margin-right: 0.75rem;
  }
  margin-bottom: 0.875rem;
`;
export const ItemTagSection = styled.div`
  display: flex;
  margin-top: 12.5rem;
`;
export const ItemTagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1.75rem;
  background-color: ${colorPalette.deepMintColor};
  border-radius: 20px;
  color: ${colorPalette.whiteColor};
  margin-right: 1rem;
`;
export const StyledSlider = styled(Slider)`
  width: 49.5rem;
  height: 33.75rem;
  margin-right: 0;

  .slick-slide div {
    cursor: pointer;
  }
  .slick-slide img {
    object-fit: cover;
  }
  .slick-prev::before,
  .slick-next::before {
    width: 35px;
    height: 35px;
    z-index: 2;
    background-color: black;
  }
`;

export const ImageCarouselContainer = styled.div`
  width: 49.5rem;
  height: 33.75rem;
  ul {
    transform: translateY(-2.5rem);
  }
`;
export const ItemImageBox = styled.div`
  & img {
    margin-right: 0;
    width: 49.5rem;
    height: 33.75rem;
  }
`;
