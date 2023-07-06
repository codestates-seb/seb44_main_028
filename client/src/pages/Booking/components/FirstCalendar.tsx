import { useState } from 'react';
import { YearAndMonthWrapper, Btn, Month, Table, Year } from '../style';
import Days from './Days';
import Dates from './Dates';

function FirstCalendar() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const onClickBack = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };

  const onClickNext = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };
  return (
    <Table>
      <YearAndMonthWrapper>
        <Btn onClick={onClickBack}>◀️</Btn>
        <Month>{month + '월'}</Month>
        <Year>{year}</Year>
        <Btn onClick={onClickNext}>▶️</Btn>
      </YearAndMonthWrapper>
      <Days />
      <Dates />
    </Table>
  );
}

export default FirstCalendar;
