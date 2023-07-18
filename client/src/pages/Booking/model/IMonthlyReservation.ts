import { StartEndDateProps } from './IStartEndDateProps';

export interface IMonthlyReservation {
  productTitle: string;
  baseFee: number;
  feePerDay: number;
  minimumRentalPeriod: number;
  reservationsDate1: StartEndDateProps[];
  reservationsDate2: StartEndDateProps[];
}
