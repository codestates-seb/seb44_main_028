import BookingDates from '../components/BookingDates';
import Calendars from '../components/Calendars';
import { BookingPageContainer } from '../style';

function BookingPage() {
  return (
    <BookingPageContainer>
      <BookingDates />
      <Calendars />
    </BookingPageContainer>
  );
}
export default BookingPage;
