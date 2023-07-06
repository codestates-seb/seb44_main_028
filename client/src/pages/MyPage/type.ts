import { Dispatch, SetStateAction, ReactNode } from 'react';

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
  label: string;
};

export type TapButtonType = {
  nowActivatedTabValue: string;
  handleNowActivatedTabValue: (inputValue: string) => void;
};
