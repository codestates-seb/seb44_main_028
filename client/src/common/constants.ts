import { SelectOption, CategoryProps } from './type';
import climbing from '../assets/category_icon/등산.svg';
import camping from '../assets/category_icon/캠핑.svg';
import ski from '../assets/category_icon/스키.svg';
import waterPlay from '../assets/category_icon/물놀이.svg';
import forLiving from '../assets/category_icon/생활용품.svg';
import forShooting from '../assets/category_icon/촬영보조용품.svg';
import play from '../assets/category_icon/놀거리.svg';
import clothes from '../assets/category_icon/의류.svg';
import accessory from '../assets/category_icon/액서서리.svg';
import others from '../assets/category_icon/기타.svg';

export const DISTANCE_DEFAULT_VALUE = '내 주변에서 찾기';
export const DISTANCE_OPTIONS: SelectOption[] = [
  {
    value: 10,
    label: '10k㎡',
  },
  {
    value: 20,
    label: '20k㎡',
  },
  {
    value: 30,
    label: '30k㎡',
  },
];

export const PRODUCT_FILTER_OPTIONS: SelectOption[] = [
  {
    value: 'createdAt',
    label: '최신순',
  },
  {
    value: 'totalRateScore',
    label: '별점순',
  },
  {
    value: 'viewCount',
    label: '조회순',
  },
  {
    value: 'distance',
    label: '가까운순',
  },
];

export const CATEGORY: CategoryProps[] = [
  {
    id: '1',
    image: climbing,
    name: '등산',
  },
  {
    id: '2',
    image: camping,
    name: '캠핑',
  },
  {
    id: '3',
    image: ski,
    name: '스키',
  },
  {
    id: '4',
    image: waterPlay,
    name: '물놀이',
  },
  {
    id: '5',
    image: forLiving,
    name: '생활용품',
  },
  {
    id: '6',
    image: forShooting,
    name: '촬영용품',
  },
  {
    id: '7',
    image: play,
    name: '놀거리',
  },
  {
    id: '8',
    image: clothes,
    name: '의류',
  },
  {
    id: '9',
    image: accessory,
    name: '액서서리',
  },
  {
    id: '10',
    image: others,
    name: '기타',
  },
];
export const NODATA_TEXT = '검색 결과가 없습니다.';

export const ACCESS_TOKEN = 'access_token';
