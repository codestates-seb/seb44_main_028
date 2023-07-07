import { useSelector } from 'react-redux';
import {
  BookingDatesForm,
  BookingDatesLabel,
  DatesInput,
  DatesWrapper,
} from '../style';
import { RootState } from '../../../common/store/RootStore';

function BookingDates() {
  const reservationState = useSelector((state: RootState) => state.reservation);
  return (
    <BookingDatesForm>
      <DatesWrapper>
        <BookingDatesLabel>예약 시작 날짜</BookingDatesLabel>
        <DatesInput />
        {reservationState.startDate
          ? `${reservationState.startDate?.year}/${reservationState.startDate?.month}/${reservationState.startDate?.date}`
          : null}
      </DatesWrapper>
      <DatesWrapper>
        <BookingDatesLabel>예약 마감 날짜</BookingDatesLabel>
        <DatesInput />
        {reservationState.endDate
          ? `${reservationState.endDate?.year}/${reservationState.endDate?.month}/${reservationState.endDate?.date}`
          : null}
      </DatesWrapper>
    </BookingDatesForm>
  );
}
export default BookingDates;
