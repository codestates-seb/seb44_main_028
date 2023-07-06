import styled from 'styled-components';

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
  border: 1px solid transparent;
  border-radius: 20px;
  height: 426px;
  width: 403px;
  margin-left: 7vw;
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
  font-size: 45px;
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
  font-size: 45px;
  color: black;
  padding-bottom: 40px;
  position: absolute;
  margin-right: 150px;
`;

export const Btn = styled.button`
  background: linear-gradient(200deg, rgba(125, 202, 220, 0.1), #e6cdcd);
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
  margin-top: 130px;
`;

export type EachDatesProps = {
  today: {
    year: number;
    month: number;
    date: number;
  };
  row: {
    week: number;
    lastWeek: number;
  };
  day: number;
};

export const EachDate = styled.th<EachDatesProps>`
  font-size: 20px;
  font-weight: 400;
  height: 40px;
  border: 1px solid red;
  padding: 2px 4.8vw 30px 0.5vw;
  text-shadow: 1px 1px 2px gray;
  background-image: ${(props) => {
    const date = new Date();
    const thisMonth = date.getMonth();
    const thisYear = date.getFullYear();
    return props.today.year === thisYear &&
      props.today.month === thisMonth &&
      props.today.date === props.children
      ? 'linear-gradient(150deg, rgba(249, 245, 245, 0.1),#f3bac3)'
      : 'linear-gradient(150deg, rgba(244, 239, 239, 0.1), #eae2e4)';
  }};
  color: ${(props) => {
    return (props.row.week === 0 && Number(props.children) > 7) ||
      (props.row.week === props.row.lastWeek && Number(props.children) < 8)
      ? 'rgb(0, 0, 0, 0.1)'
      : 'rgb(0, 0, 0, 0.6)';
  }};
`;
