import { DefaultBtn } from '../../../common/style/style';
import BookingDates from '../components/BookingDates';
import Calendars from '../components/Calendars';
import { BookingPageContainer } from '../style';

function BookingPage() {
  return (
    <BookingPageContainer>
      <BookingDates />
      <Calendars />
      <DefaultBtn>예약하기</DefaultBtn>
    </BookingPageContainer>
  );
}
export default BookingPage;
