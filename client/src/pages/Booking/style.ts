import styled from 'styled-components';
import { EachDatesProps } from './type';

export const BookingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BookingDatesForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 60px;
  width: 727px;
  height: 97px;
  border: 1px solid #ebebeb;
  border-radius: 50px;
`;

export const BookingDatesLabel = styled.label`
  border: 1px solid black;
`;

export const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DatesInput = styled.input`
  width: 100%;
  height: 40px;
`;

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 426px;
  width: 403px;
  box-shadow: 2px 2px 4px #999;
`;

export const YearAndMonthWrapper = styled.caption`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  margin-bottom: 650px;
  margin-top: 320px;
  height: 70px;
`;

export const Year = styled.span`
  font-size: 30px;
  color: black;
  margin-left: 80px;
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
  font-size: 30px;
  color: black;
  padding-bottom: 40px;
  position: absolute;
  margin-right: 150px;
  width: 100px;
`;

export const Btn = styled.button`
  height: 45px;
  width: 45px;
  margin: 10px 13vw;
  border: rgba(0, 0, 0, 0) 2px solid;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Day = styled.th`
  font-size: 25px;
  padding: 20px 0px 20px;
  width: 50px;
  color: black;
`;

export const DaysContainer = styled.thead`
  position: absolute;
  width: auto;
  margin-bottom: 250px;
`;

export const DatesContainer = styled.tbody`
  margin-top: 105px;
`;

export const EachDate = styled.th<EachDatesProps>`
  font-size: 20px;
  font-weight: 400;
  height: 20px;
  padding: 14px;
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
        props.today.date > Number(props.children))
      ? 'not-allowed'
      : 'pointer';
  }};
`;
