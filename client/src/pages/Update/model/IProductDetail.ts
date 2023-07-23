export interface IProductDetail {
  title: string;
  baseFee: number | string;
  categories?: string[];
  categoryIds?: string[] | undefined;
  content: string;
  feePerDay: number | string;
  minimumRentalPeriod: number | string;
  overdueFee: number | string;
  ownerMemberId: number;
  productImages: string[];
  rate: number;
  userImage: string;
  username: string;
  viewCount: number;
  address: string;
}
