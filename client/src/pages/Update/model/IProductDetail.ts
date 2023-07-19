export interface IProductDetail {
  title: string;
  baseFee: number;
  categories: string[];
  content: string;
  feePerDay: number;
  minimumRentalPeriod: number | string;
  overdueFee: number;
  ownerMemberId: number;
  productImages: string[];
  rate: number;
  userImage: string;
  username: string;
  viewCount: number;
  address: string;
}
