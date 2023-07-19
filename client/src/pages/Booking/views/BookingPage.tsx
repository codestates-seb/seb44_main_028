import axios from 'axios';
import BookingDates from '../components/BookingDates';
import Calendars from '../components/Calendars';
import ReservationBtn from '../components/ReservationBtn';
import { BookingPageContainer } from '../style';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StartEndDateProps } from '../model/IStartEndDateProps';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthlyReservation } from '../store/MonthlyReservationStore';
import { RootState } from '../../../common/store/RootStore';

function BookingPage() {
  // GET요청으로 기존 예약 정보 가져오기
  const dispatch = useDispatch();

  interface IMonthlyReservation {
    productTitle: string;
    baseFee: number;
    feePerDay: number;
    minimumRentalPeriod: number;
    reservationsDate1: StartEndDateProps[];
    reservationsDate2: StartEndDateProps[];
  }
  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const nextMonth = (today.getMonth() + 2).toString().padStart(2, '0');

  const { itemId } = useParams<{ itemId: string }>();
  useEffect(() => {
    const getReservation = () => {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/reservations/products/${itemId}/calendar?date1=${year}-${currentMonth}&date2=${year}-${nextMonth}`,
        )
        .then((res) => {
          // console.log('제목', res.data.productTitle);
          // console.log('기본료', res.data.baseFee);
          // console.log('하루 사용료', res.data.feePerDay);
          // console.log('최소 렌탈 기간', res.data.minimumRentalPeriod);
          // console.log('이번 달 예약 배열', res.data.reservationsDate1);
          // console.log('다음 달 예약 배열', res.data.reservationsDate2);
          // console.log('예약 정보', res.data);
          dispatch(
            setMonthlyReservation({
              productTitle: res.data.productTitle,
              baseFee: res.data.baseFee,
              feePerDay: res.data.feePerDay,
              minimumRentalPeriod: res.data.minimumRentalPeriod,
              reservationsDate1: res.data.reservationsDate1,
              reservationsDate2: res.data.reservationsDate2,
            }),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getReservation();
  }, [itemId]);
  const monthlyReservation = useSelector(
    (state: RootState) => state.monthlyReservation,
  );
  return (
    <BookingPageContainer>
      <BookingDates />
      <Calendars />
      <h1>productTitle: {monthlyReservation.productTitle}</h1>
      <h1>baseFee: {monthlyReservation.baseFee}원</h1>
      <h1>feePerDay: {monthlyReservation.feePerDay}원</h1>
      <h1>minimumRentalPeriod: {monthlyReservation.minimumRentalPeriod}일</h1>
      <ReservationBtn />
    </BookingPageContainer>
  );
}
export default BookingPage;
