import { useSelector } from 'react-redux';
import {
  BookingDatesForm,
  BookingDatesLabel,
  DatesWrapper,
  ReservationDate,
  SeparationLine,
} from '../style';
import { RootState } from '../../../common/store/RootStore';

const makeDateFilledWithZero = (
  reservationDate: { year: number; month: number; date: number } | null,
) => {
  const fillZero = (number: number) => {
    return String(number).padStart(2, '0');
  };

  if (reservationDate) {
    const { year, month, date } = reservationDate;
    return `${year}.${fillZero(month)}.${fillZero(date)}`;
  } else {
    return null;
  }
};

function BookingDates() {
  const reservationStartDate = useSelector(
    (state: RootState) => state.reservation.startDate,
  );

  const reservationEndDate = useSelector(
    (state: RootState) => state.reservation.endDate,
  );

  const startDateFilledWithZero = makeDateFilledWithZero(reservationStartDate);
  const endDateFilledWithZero = makeDateFilledWithZero(reservationEndDate);

  return (
    <BookingDatesForm>
      <DatesWrapper>
        <BookingDatesLabel>예약 시작 날짜</BookingDatesLabel>
        <ReservationDate>{startDateFilledWithZero}</ReservationDate>
      </DatesWrapper>
      <SeparationLine>|</SeparationLine>
      <DatesWrapper>
        <BookingDatesLabel>예약 마감 날짜</BookingDatesLabel>
        <ReservationDate>{endDateFilledWithZero}</ReservationDate>
      </DatesWrapper>
    </BookingDatesForm>
  );
}
export default BookingDates;
