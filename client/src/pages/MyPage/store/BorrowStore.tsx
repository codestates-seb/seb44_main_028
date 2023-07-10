import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBorrowProps {
  reservationId: string;
  memberId: string;
  productId: string;
  status: string;
  totalFee: string;
  startDate: string;
  endDate: string;
}

const initialBorrowState: IBorrowProps[] = [
  {
    reservationId: 'adsa1',
    memberId: 'ad23',
    productId: 'asd3',
    status: 'INUSE',
    totalFee: '10000',
    startDate: '2023-06-10:30:15.123456789',
    endDate: '2023-06-10:30:15.123456789',
  },
  {
    reservationId: 'adsa1',
    memberId: 'ad23',
    productId: 'asd3',
    status: 'INUSE',
    totalFee: '10000',
    startDate: '2023-06-10:30:15.123456789',
    endDate: '2023-06-10:30:15.123456789',
  },
];

export const borrow = createSlice({
  name: 'borrowReducer',
  initialState: initialBorrowState,
  reducers: {
    addBorrowList: (state, action: PayloadAction<IBorrowProps[]>) => {
      state.push(...action.payload);
    },
  },
});

export const borrowStore = configureStore({ reducer: borrow.reducer });
export const { addBorrowList } = borrow.actions;
