import MainImage from '../../assets/image_slider/MainImage.svg';
import CampingImage from '../../assets/image_slider/CampingImage.svg';
import BeachImage from '../../assets/image_slider/BeachImage.svg';
import SkiImage from '../../assets/image_slider/SkiImage.svg';
import { ImageData } from './type';

export const IMAGE_SLIDER: ImageData[] = [
  {
    image: MainImage,
    name: '메인',
  },
  {
    image: CampingImage,
    name: '캠핑',
  },
  {
    image: BeachImage,
    name: '바다',
  },
  {
    image: SkiImage,
    name: '스키',
  },
];
