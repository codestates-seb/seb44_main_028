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
export const ITEMCARDLIST_TITLE: string[] = [
  '평점 높은 순',
  '이 달의 인기 상품',
  '0원에 드려요',
  '개발자도 빌려줘요',
];
export const ITEMCARD_DATA: ItemCardProps[] = [
  {
    id: '1',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '2',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '3',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];
export const ITEMCARD_DEVELOPMENT_DATA: ItemCardProps[] = [
  {
    id: '1',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '2',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '3',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '4',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '5',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    id: '6',
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
    imageUrl:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];
