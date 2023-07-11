import { InputFieldData } from './type';

export const MAX_IMAGE_COUNT = 5;

export const INPUT_FIELD: InputFieldData[] = [
  {
    id: 'minRentalPeriod',
    title: '최소 대여시간',
  },
  {
    id: 'baseFee',
    title: '고정금액',
  },
  {
    id: 'feePerDay',
    title: '1일 당 추가금액',
  },
  {
    id: 'title',
    title: '제목',
  },
];
