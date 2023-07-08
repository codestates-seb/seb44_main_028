import styled from 'styled-components';
import { EachDatesProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/RootStore';
import { colorPalette } from '../../common/utils/enum/colorPalette';

export const BookingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1000px;
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 807px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  margin-top: 50px;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
  border-radius: 20px;
  box-shadow: 2px 2px 5px #999;
`;

export const BookingDatesForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  padding-top: 5px;
  width: 727px;
  height: 97px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  box-shadow: 1px 1px 3px #999;
`;

export const BookingDatesLabel = styled.label`
  font-weight: 600;
`;

export const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ReservationDate = styled.h6`
  font-size: 20px;
  font-weight: 300;
  margin-top: 10px;
`;

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 426px;
  width: 403px;
`;

export const YearAndMonthWrapper = styled.caption`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin-top: 20px;
`;

export const Year = styled.span`
  font-size: 20px;
  color: black;
  margin-left: 40px;
  position: absolute;
`;

export const MonthWrapper = styled.caption`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  margin-bottom: 500px;
`;

export const Month = styled.span`
  font-size: 20px;
  color: black;
  padding-bottom: 40px;
  position: absolute;
  margin-right: 70px;
  width: 100px;
`;

export const Btn = styled.button`
  position: relative;
  height: 45px;
  width: 45px;
  border-radius: 100px;
  border: none;
`;

export const Day = styled.th`
  font-size: 20px;
  padding: 20px 0px 20px;
  width: 44px;
  color: black;
  font-weight: 450;
`;

export const DaysContainer = styled.thead`
  position: absolute;
  width: auto;
  margin-bottom: 205px;
`;

export const DatesContainer = styled.tbody`
  margin-top: 105px;
`;

export const EachDate = styled.th<EachDatesProps>`
  font-size: 20px;
  font-weight: 400;
  height: 20px;
  padding: 11px;
  color: ${(props) => {
    const thisMonth = new Date().getMonth() + 1;
    return (props.row.week === 0 && Number(props.children) > 7) ||
      (props.row.week === props.row.lastWeek && Number(props.children) < 8) ||
      props.today.year < new Date().getFullYear() ||
      (props.today.year === new Date().getFullYear() &&
        props.today.month < thisMonth) ||
      (props.today.year === new Date().getFullYear() &&
        props.today.month === thisMonth &&
        props.today.date > Number(props.children))
      ? 'rgb(0, 0, 0, 0.1)'
      : 'rgb(0, 0, 0, 0.6)';
  }};
  cursor: ${(props) => {
    const thisMonth = new Date().getMonth() + 1;
    return (props.row.week === 0 && Number(props.children) > 7) ||
      (props.row.week === props.row.lastWeek && Number(props.children) < 8) ||
      props.today.year < new Date().getFullYear() ||
      (props.today.year === new Date().getFullYear() &&
        props.today.month < thisMonth) ||
      (props.today.year === new Date().getFullYear() &&
        props.today.month === thisMonth &&
        props.today.date > Number(props.children)) ||
      Number(props.children) === 0
      ? 'default'
      : 'pointer';
  }};
  background-color: ${(props) => {
    const start = useSelector(
      (state: RootState) => state.reservation.startDate,
    );
    const end = useSelector((state: RootState) => state.reservation.endDate);

    const startYear = start?.year;
    const startMonth = start?.month;
    const startDate = start?.date;

    const endYear = end?.year;
    const endMonth = end?.month;
    const endDate = end?.date;

    if (start && !end) {
      return startYear === props.today.year &&
        startMonth === props.today.month &&
        startDate === Number(props.children)
        ? colorPalette.deepMintColor
        : 'white';
    }

    if (startDate && endDate) {
      if (startYear === endYear) {
        if (startMonth === endMonth) {
          return startYear === props.today.year &&
            startMonth === props.today.month &&
            startDate <= Number(props.children) &&
            endDate >= Number(props.children)
            ? colorPalette.deepMintColor
            : 'white';
        } else {
          return ((startYear === props.today.year &&
            startMonth === props.today.month &&
            startDate <= Number(props.children)) ||
            (endYear === props.today.year &&
              endMonth === props.today.month &&
              endDate >= Number(props.children))) &&
            Number(props.children) !== 0
            ? colorPalette.deepMintColor
            : startMonth &&
              endMonth &&
              endMonth - startMonth > 1 &&
              props.today.month > startMonth &&
              props.today.month < endMonth &&
              Number(props.children) !== 0
            ? colorPalette.deepMintColor
            : 'white';
        }
      }
    }
  }};
`;

export const SeparationLine = styled.span`
  position: absolute;
  font-size: 70px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.1);
`;
