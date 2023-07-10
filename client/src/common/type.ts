export type CategoryButtonProps = {
  ImageId: number;
  imageUrl: string;
  imageName: string;
};
export type ModalPortalProps = {
  children: React.ReactNode;
};
export type ModalFrameProps = {
  leftButtonText: string;
  rightButtonText: string;
  children: React.ReactNode;
  setOnModal: (state: boolean) => void;
};
export type SelectOption = {
  value: string;
  label: string;
};
export type CategoryProps = {
  id: number;
  image: string;
  name: string;
};
export type CheckBoxProps = {
  categoryData: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};
export type ItemCardListProps = {
  itemCardListTitle: string;
  itemCardListContentData: ItemCardProps[];
};
export type ItemCardProps = {
  id: number;
  title: string;
  baseFee: number;
  feePerDay: number;
  overdueFee: number;
  content: string;
  minimumRentalPeriod: number;
  category: number[];
  location: string;
  minRental: number;
  imageUrl: string;
};
