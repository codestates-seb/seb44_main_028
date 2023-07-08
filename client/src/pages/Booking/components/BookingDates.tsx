import { useSelector } from 'react-redux';
import {
  BookingDatesForm,
  BookingDatesLabel,
  DatesWrapper,
  ReservationDate,
  SeparationLine,
} from '../style';
import { RootState } from '../../../common/store/RootStore';

function BookingDates() {
  const reservationStartDate = useSelector(
    (state: RootState) => state.reservation.startDate,
  );
  const reservationEndDate = useSelector(
    (state: RootState) => state.reservation.endDate,
  );

  const fillZero = (number: number) => {
    return String(number).padStart(2, '0');
  };

  return (
    <BookingDatesForm>
      <DatesWrapper>
        <BookingDatesLabel>예약 시작 날짜</BookingDatesLabel>
        <ReservationDate>
          {reservationStartDate
            ? `${reservationStartDate?.year}.${fillZero(
                reservationStartDate?.month,
              )}.${fillZero(reservationStartDate?.date)}`
            : null}
        </ReservationDate>
      </DatesWrapper>
      <SeparationLine>|</SeparationLine>
      <DatesWrapper>
        <BookingDatesLabel>예약 마감 날짜</BookingDatesLabel>
        <ReservationDate>
          {reservationEndDate
            ? `${reservationEndDate?.year}.${fillZero(
                reservationEndDate?.month,
              )}.${fillZero(reservationEndDate?.date)}`
            : null}
        </ReservationDate>
      </DatesWrapper>
    </BookingDatesForm>
  );
}
export default BookingDates;
