import MainImage from '../../assets/image_slider/MainImage.svg';
import CampingImage from '../../assets/image_slider/CampingImage.svg';
import BeachImage from '../../assets/image_slider/BeachImage.svg';
import SkiImage from '../../assets/image_slider/SkiImage.svg';
import { ImageData } from './type';
import { ItemCardProps } from '../../common/type';

export const INTEREST_KEY = 'interest';
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
    productId: '86911664-5691-4fb3-b441-04e1eca38fb7',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '97c61b71-f91f-47f8-8737-7e4e15cdb36f',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '506d3643-573f-4347-b51f-36cc7abcbccb',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];
export const ITEMCARD_DEVELOPMENT_DATA: ItemCardProps[] = [
  {
    productId: '1',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '2',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '3',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '4',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '5',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    productId: '6',
    title: '다이슨 빌려줍니다.',
    baseFee: 10000,
    feePerDay: 5000,
    overdueFee: 1000,
    content:
      '에어랩 빌려가실 분? 다이슨은 영국의 기업으로 아무튼 사랑받고 있답니다.',
    minimumRentalPeriod: 5,
    category: [1, 2, 3],
    address: '동대문구 마장동',
    minRental: 3,
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];
