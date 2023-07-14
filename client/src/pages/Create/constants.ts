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
export const INPIT_VALIDATION = '필수 입력 항목입니다.';

export const CONTENT_DESCRIPTION =
  '렌탈할 상품에 대한 게시글 내용을 작성해주세요. 신뢰할 수 있는 거래를 위해 자세히 적어주세요.';
