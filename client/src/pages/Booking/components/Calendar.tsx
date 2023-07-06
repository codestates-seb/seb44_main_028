import { useState } from 'react';
import { useSelector } from 'react-redux';
import { YearAndMonthWrapper, Btn, Month, Table, Year } from '../style';
import Days from './Days';
import Dates from './Dates';
import { RootState } from '../../../common/store/RootStore';

function Calendar({ currentDate }: any) {
  const current = useSelector((state: RootState) => state.calendar);

  return (
    <Table>
      <YearAndMonthWrapper>
        <Month>{current.month + '월'}</Month>
        <Year>{current.year}</Year>
      </YearAndMonthWrapper>
      <Days />
      <Dates />
    </Table>
  );
}

export default Calendar;
