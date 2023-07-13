import BookingDates from '../components/BookingDates';
import Calendars from '../components/Calendars';
import ReservationBtn from '../components/ReservationBtn';
import { BookingPageContainer } from '../style';

function BookingPage() {
  return (
    <BookingPageContainer>
      <BookingDates />
      <Calendars />
      <ReservationBtn />
    </BookingPageContainer>
  );
}
export default BookingPage;
