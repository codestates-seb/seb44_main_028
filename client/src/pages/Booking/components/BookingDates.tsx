import { useDispatch, useSelector } from 'react-redux';
import { BookingDatesForm, SeparationLine } from '../style';
import { makeDateFilledWithZero } from '../../../common/utils/helperFunctions/makeDateFilledWithZero';
import { RootState } from '../../../common/store/RootStore';
import DatesUserClickd from './DatesUserClicked';
import { clearReservationDates } from '../store/ReservationDateStore';
import Separation from './Refresh';

function BookingDates() {
  const reservationStartDate = useSelector(
    (state: RootState) => state.reservation.startDate,
  );

  const reservationEndDate = useSelector(
    (state: RootState) => state.reservation.endDate,
  );

  const startDateFilledWithZero = makeDateFilledWithZero(
    reservationStartDate,
    '.',
  );
  const endDateFilledWithZero = makeDateFilledWithZero(reservationEndDate, '.');

  return (
    <>
      <BookingDatesForm>
        <DatesUserClickd text="예약 시작 날짜" date={startDateFilledWithZero} />
        <SeparationLine>|</SeparationLine>
        <DatesUserClickd text="예약 마감 날짜" date={endDateFilledWithZero} />
      </BookingDatesForm>
    </>
  );
}
export default BookingDates;
