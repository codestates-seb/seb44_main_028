import styled, { css } from 'styled-components';
import { DateType, EachDatesProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/RootStore';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { StartEndDateProps } from './model/IStartEndDateProps';

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

export const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ReservationDate = styled.h6`
  position: absolute;
  font-size: 20px;
  font-weight: 300;
  margin-top: 25px;
`;

export const BookingDatesLabel = styled.label`
  position: absolute;
  font-weight: 600;
  margin-bottom: 25px;
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

const isWithinReservationPeriods = (
  dateInfo: DateType,
  reservationData: StartEndDateProps[],
) => {
  const currentDate = new Date(
    dateInfo.year,
    dateInfo.month - 1,
    dateInfo.date,
  );
  for (const reservation of reservationData) {
    const { startDate, endDate } = reservation;
    const start = new Date(startDate.year, startDate.month - 1, startDate.date);
    const end = new Date(endDate.year, endDate.month - 1, endDate.date);
    if (currentDate >= start && currentDate <= end && dateInfo.date) {
      return true;
    }
  }
  return false;
};

export const EachDate = styled.th<EachDatesProps>`
  font-size: 20px;
  font-weight: 400;
  height: 20px;
  padding: 11px;
  border-radius: 10px;
  ${(props) => {
    // 기예약된 날짜
    const dateInfo = {
      year: props.current.year,
      month: props.current.month,
      date: Number(props.children),
    };

    if (isWithinReservationPeriods(dateInfo, props.reservationDataFromServer)) {
      return css`
        color: ${colorPalette.lightColor};
        background-color: ${colorPalette.grayColor};
        cursor: 'not-allowed';
      `;
    }

    // 유저가 클릭한 날짜
    const today = new Date();
    const todaysYear = today.getFullYear();
    const todaysMonth = today.getMonth() + 1;

    const currentYear = props.current.year;
    const currentMonth = props.current.month;
    const currentDate = props.current.date;

    const week = props.row.week;
    const finalWeek = props.row.finalWeek;
    const date = Number(props.children);

    const isPrevMonthDate = week === 0 && date > 7;
    const isNextMonthDate = week === finalWeek && date < 8;
    const isPrevYear = currentYear < todaysYear;
    const isPrevMonth =
      currentYear === todaysYear && currentMonth < todaysMonth;
    const isPrevDate =
      currentYear === todaysYear &&
      currentMonth === todaysMonth &&
      currentDate > date;

    const isDisabled =
      isPrevMonthDate ||
      isNextMonthDate ||
      isPrevYear ||
      isPrevMonth ||
      isPrevDate ||
      date === 0;

    return css`
      color: ${isDisabled ? 'rgb(0, 0, 0, 0.1)' : 'rgb(0, 0, 0, 0.6)'};
      cursor: ${isDisabled ? 'default' : 'pointer'};
    `;
  }};

  background-color: ${(props) => {
    // 기예약된 날짜
    const dateInfo = {
      year: props.current.year,
      month: props.current.month,
      date: Number(props.children),
    };
    if (isWithinReservationPeriods(dateInfo, props.reservationDataFromServer)) {
      return colorPalette.grayColor;
    }
    const start = useSelector(
      (state: RootState) => state.reservation.startDate,
    );
    const end = useSelector((state: RootState) => state.reservation.endDate);

    const startYear = start?.year;
    const startMonth = start?.month;
    const startDate = start?.date;
    if (!startYear || !startMonth || !startDate) return;

    const endYear = end?.year;
    const endMonth = end?.month;
    const endDate = end?.date;

    const currentYear = props.current.year;
    const currentMonth = props.current.month;
    const date = Number(props.children);

    if (!date) return;

    if (start && !end) {
      return startYear === currentYear &&
        startMonth === currentMonth &&
        startDate === date
        ? colorPalette.lightColor
        : 'white';
    }

    if (!endYear || !endMonth || !endDate) return;

    const isLaterThanStartDate =
      startYear === currentYear &&
      startMonth === currentMonth &&
      startDate <= date;

    const isEarlierThanEndDate =
      endYear === currentYear && endMonth === currentMonth && endDate >= date;

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return isLaterThanStartDate && isEarlierThanEndDate
          ? colorPalette.lightColor
          : 'white';
      } else {
        return isLaterThanStartDate ||
          isEarlierThanEndDate ||
          (startYear === currentYear &&
            endMonth - startMonth > 1 &&
            currentMonth > startMonth &&
            currentMonth < endMonth)
          ? colorPalette.lightColor
          : 'white';
      }
    }

    if (
      isLaterThanStartDate ||
      isEarlierThanEndDate ||
      (startYear === currentYear && startMonth < currentMonth) ||
      (endYear === currentYear && endMonth > currentMonth) ||
      (endYear - startYear > 1 &&
        currentYear > startYear &&
        currentYear < endYear)
    ) {
      return colorPalette.lightColor;
    }
  }};
`;

export const SeparationLine = styled.span`
  position: absolute;
  font-size: 70px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.1);
`;
