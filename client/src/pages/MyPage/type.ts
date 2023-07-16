import { Dispatch, SetStateAction, ReactNode } from 'react';

export type ProfileDataType = {
  displayName: string;
  latitude: string;
  longitude: string;
};

export type RatingStarType = {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
};

export type ModalType = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  children: ReactNode;
};

export type ImageUploadType = {
  input: string;
};

export type TapButtonType = {
  // nowActivatedTabValue: string;
  // handleNowActivatedTabValue: (inputValue: string) => void;
  tap: string;
  setTapList: Dispatch<SetStateAction<string[]>>;
};
export type WishListType = {
  item: string[];
  interestId: number[];
};
export type PagingType = {
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItemsCount: number;
  totalPages: number;
};