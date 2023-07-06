import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { YearAndMonthWrapper, Btn, Month, Table, Year } from '../style';
import Days from './Days';
import Dates from './Dates';
import { setDate } from '../store/CalendarStore';
import { RootState } from '../../../common/store/RootStore';

function FirstCalendar() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.calendar);

  const onClickBack = () => {
    if (current.month > 1) {
      dispatch(setDate({ ...current, month: current.month - 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year - 1, month: 12 }));
    }
  };

  const onClickNext = () => {
    if (current.month < 12) {
      dispatch(setDate({ ...current, month: current.month + 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year + 1, month: 1 }));
    }
  };
  return (
    <Table>
      <YearAndMonthWrapper>
        <Btn onClick={onClickBack}>◀️</Btn>
        <Month>{current.month + '월'}</Month>
        <Year>{current.year}</Year>
        <Btn onClick={onClickNext}>▶️</Btn>
      </YearAndMonthWrapper>
      <Days />
      <Dates />
    </Table>
  );
}

export default FirstCalendar;
