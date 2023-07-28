import { useDispatch } from 'react-redux';
import { clearReservationDates } from '../store/ReservationDateStore';
import { RefreshBtn } from '../style';

function Refresh() {
  const dispatch = useDispatch();
  const handleClearReservation = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    dispatch(clearReservationDates());
  };
  return <RefreshBtn onClick={handleClearReservation}>날짜 재설정</RefreshBtn>;
}
export default Refresh;
