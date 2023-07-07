import {
  BookingDatesForm,
  BookingDatesLabel,
  DatesInput,
  DatesWrapper,
} from '../style';

function BookingDates() {
  return (
    <BookingDatesForm>
      <DatesWrapper>
        <BookingDatesLabel>예약 시작 날짜</BookingDatesLabel>
        <DatesInput />
      </DatesWrapper>
      <DatesWrapper>
        <BookingDatesLabel>예약 마감 날짜</BookingDatesLabel>
        <DatesInput />
      </DatesWrapper>
    </BookingDatesForm>
  );
}
export default BookingDates;
