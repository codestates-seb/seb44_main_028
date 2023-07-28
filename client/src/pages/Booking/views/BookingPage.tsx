import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import Calendars from '../components/Calendars';
import ReservationBtn from '../components/ReservationBtn';
import { useDispatch, useSelector } from 'react-redux';
import { BookingPageContainer } from '../style';
import { setMonthlyReservation } from '../store/MonthlyReservationStore';
import { RootState } from '../../../common/store/RootStore';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';
import { clearReservationDates } from '../store/ReservationDateStore';
import RentalProductInfo from '../components/RentalProductInfo';
import useGetReservationData from '../../../common/utils/customHooks/useGetReservationData';

function BookingPage() {
  const dispatch = useDispatch();
  const { itemId } = useParams<{ itemId: string }>();

  useScrollToTop();

  const location = useLocation();
  useEffect(() => {
    return () => {
      dispatch(clearReservationDates());
    };
  }, [location]);

  const getReservationData = useGetReservationData(itemId);

  const { isLoading, isError, error, data } = useQuery(
    ['reservation', itemId],
    () => getReservationData(),
    {
      enabled: !!itemId,
    },
  );

  useEffect(() => {
    if (isError) {
      console.log(error);
    }

    if (!isLoading && data) {
      dispatch(setMonthlyReservation(data));
    }
  }, [isLoading, data, dispatch]);

  const monthlyReservation = useSelector(
    (state: RootState) => state.monthlyReservation,
  );

  return (
    <BookingPageContainer>
      <BookingDates />
      <Calendars />
      <RentalProductInfo monthlyReservation={monthlyReservation} />
      <ReservationBtn
        minimumRentalPeriod={monthlyReservation.minimumRentalPeriod}
      />
    </BookingPageContainer>
  );
}
export default BookingPage;
