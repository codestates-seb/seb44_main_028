import { ReactNode } from 'react';
import { ICategory } from './model/ICategory';

export type CategoryButtonProps = {
  ImageId: string;
  imageUrl: string;
  imageName: string;
};
export type SelectOption = {
  value: string | number;
  label: string;
};
export type CategoryProps = {
  id: string;
  image: string;
  name: string;
};
export type CategoryListProps = {
  selectedtCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
};
export type CheckBoxProps = {
  categoryTitle: string;
  categoryId: string;
  selectedtCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
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
  productId: string;
  title: string;
  baseFee: number;
  feePerDay: number;
  overdueFee: number;
  content: string;
  minimumRentalPeriod: number;
  category: string[];
  address: string;
  minRental: number;
  image: string;
  username?: string;
};

export type lendCardProps = {
  productId: string;
  reservationId: string;
  status: string;
  username: string;
  totalFee: string;
  startDate: string;
  endDate: string;
  image: string;
};

export type borrowCardProps = {
  reservationId: string;
  title: string;
  image: string;
  status: string;
  startDate: string;
  endDate: string;
};
