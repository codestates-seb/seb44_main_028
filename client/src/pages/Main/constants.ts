import MainImage from '../../assets/image_slider/MainImage.svg';
import CampingImage from '../../assets/image_slider/CampingImage.svg';
import BeachImage from '../../assets/image_slider/BeachImage.svg';
import SkiImage from '../../assets/image_slider/SkiImage.svg';
import { ImageData } from './type';
import { ItemCardProps } from '../../common/type';

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
// 데이터 받기 전 임시 데이터
export const ITEMCARDLIST_TITLE = '평점 높은 순';
export const ITEMCARD_DATA: ItemCardProps[] = [
  {
    id: 1,
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    location: '동대문구 마장동',
    minRental: 3,
  },
  {
    id: 2,
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    location: '동대문구 마장동',
    minRental: 3,
  },
  {
    id: 3,
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    location: '동대문구 마장동',
    minRental: 3,
  },
];
