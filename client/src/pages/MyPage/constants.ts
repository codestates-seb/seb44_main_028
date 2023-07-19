import {
  ItemCardProps,
  borrowCardProps,
  lendCardProps,
} from '../../common/type';
export const TAP = ['빌려준내역', '빌린내역', '관심 목록'];

export const LENDCARD_DATA: lendCardProps[] = [
  {
    reservationId: '1',
    status: 'REQUESTED',
    username: '첫번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '2',
    status: 'REQUESTED',
    username: '두번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '3',
    status: 'REQUESTED',
    username: '세번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '4',
    status: 'INUSE',
    username: '네번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '5',
    status: 'REQUESTED',
    username: '다섯번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '6',
    status: 'INUSE',
    username: '여섯번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '7',
    status: 'INUSE',
    username: '일곱번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    reservationId: '8',
    status: 'INUSE',
    username: '여덟번째',
    totalFee: '100,000',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];

// export const LENDCARD_DATA: lendCardProps[] = [
//   {
//     reservationId: '1',
//     status: 'INUSE',
//     username: '첫번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '2',
//     status: 'INUSE',
//     username: '두번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '3',
//     status: 'INUSE',
//     username: '세번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '4',
//     status: 'INUSE',
//     username: '네번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '5',
//     status: 'INUSE',
//     username: '다섯번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '6',
//     status: 'INUSE',
//     username: '여섯번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '7',
//     status: 'INUSE',
//     username: '일곱번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '8',
//     status: 'INUSE',
//     username: '여덟번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
// ];


export const BORROWCARD_DATA: borrowCardProps[] = [
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'REQUESTED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'COMPLETED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'COMPLETED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'INUSE',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'INUSE',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'INUSE',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'REQUESTED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'REQUESTED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
  {
    title: '충전기 빌려드려요 1',
    startDate: '2023 - 06 - 10',
    endDate: '2023 - 06 - 14',
    status: 'REQUESTED',
    image:
      'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
  },
];
// export const BORROWCARD_DATA: borrowCardProps[] = [
//   {
//     title: '충전기 빌려드려요 1',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '2',
//     status: 'INUSE',
//     username: '두번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '3',
//     status: 'INUSE',
//     username: '세번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '4',
//     status: 'INUSE',
//     username: '네번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '5',
//     status: 'INUSE',
//     username: '다섯번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '6',
//     status: 'INUSE',
//     username: '여섯번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '7',
//     status: 'INUSE',
//     username: '일곱번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
//   {
//     reservationId: '8',
//     status: 'INUSE',
//     username: '여덟번째',
//     totalFee: '100,000',
//     startDate: '2023 - 06 - 10',
//     endDate: '2023 - 06 - 14',
//     image:
//       'https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg',
//   },
// ];

export const ITEMCARD_DATA: ItemCardProps[] = [
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
  {
    productId: '7',
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
    productId: '8',
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
    productId: '9',
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
    productId: '10',
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
    productId: '11',
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
    productId: '12',
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
export const ERROR_MESSAGE: string[] = [
  "The page you were looking for doesn't exist",
  'You may have mistyped the address or the page may have moved.',
];
