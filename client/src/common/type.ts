import { ReactNode } from 'react';

export type CategoryButtonProps = {
  ImageId: string;
  imageUrl: string;
  imageName: string;
};
export type SelectOption = {
  value: string;
  label: string;
};
export type CategoryProps = {
  id: string;
  image: string;
  name: string;
};
export type CheckBoxProps = {
  categoryData: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ModalButtonProps = {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type ModalTitleProps = {
  children?: ReactNode;
};

export type ModalAdditionalProps = {
  children: ReactNode;
};
export type ModalMainProps = {
  children?: ReactNode;
  isOpen?: boolean;
};

export type ItemCardListProps = {
  itemCardListTitle?: string;
  itemCardListContentData: ItemCardProps[];
};
export type ItemCardProps = {
  id: string;
  title: string;
  baseFee: number;
  feePerDay: number;
  overdueFee: number;
  content: string;
  minimumRentalPeriod: number;
  category: number[];
  address: string;
  minRental: number;
  images: string;
};

export type BorrowCardProps = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  images: string;
  content: string;
  category: number[];
  address: string;
};
