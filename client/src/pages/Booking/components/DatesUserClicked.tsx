import { BookingDatesLabel, DatesWrapper, ReservationDate } from '../style';

type DatesUserClickdProps = {
  text: string;
  date: string | null;
};

function DatesUserClickd({ text, date }: DatesUserClickdProps) {
  return (
    <DatesWrapper>
      <BookingDatesLabel>{text}</BookingDatesLabel>
      <ReservationDate>{date}</ReservationDate>
    </DatesWrapper>
  );
}
export default DatesUserClickd;
