import { Day, DaysContainer } from '../style';

function Days() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const showDays = days.map((day, idx) => <Day key={idx}>{day}</Day>);
  return (
    <DaysContainer>
      <tr>{showDays}</tr>
    </DaysContainer>
  );
}
export default Days;
