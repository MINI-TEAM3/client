import dayjs, { Dayjs } from 'dayjs';
import { CALENDAR_TEXTS } from '@/constants/calendar';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

export interface CalendarHeaderProps {
  dutyActive: boolean;
  annualActive: boolean;
  currentMonth: Dayjs;
  setCurrentMonth: Dispatch<SetStateAction<Dayjs>>;
  setDutyActive: Dispatch<SetStateAction<boolean>>;
  setAnnualActive: Dispatch<SetStateAction<boolean>>;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { setCurrentMonth, dutyActive, annualActive, currentMonth, setDutyActive, setAnnualActive } = props;

  const handleClickDuty = () => {
    setDutyActive(!dutyActive);
    if (!annualActive) {
      setDutyActive(dutyActive);
    }
  };

  const handleClickAnnual = () => {
    setAnnualActive(!annualActive);
    if (!dutyActive) {
      setAnnualActive(annualActive);
    }
  };

  const handleClickToday = () => {
    setCurrentMonth(dayjs(dayjs().format('YYYY-MM-DD')));
  };

  const handleClickPrev = () => {
    setCurrentMonth((prevMonth: Dayjs) => prevMonth.subtract(1, 'month'));
  };

  const handleClickNext = () => {
    setCurrentMonth((prevMonth: Dayjs) => prevMonth.add(1, 'month'));
  };

  return (
    <Container>
      <WrapLeft>
        <button className="prev-button" onClick={handleClickPrev}>
          &lt;
        </button>
        <button className="next-button" onClick={handleClickNext}>
          &gt;
        </button>
        <button className="today-button" onClick={handleClickToday}>
          {CALENDAR_TEXTS.today}
        </button>
        <MonthWrapper>{currentMonth.format('YYYY년 M월')}</MonthWrapper>
      </WrapLeft>
      <WrapRight>
        <FilterButtons>
          <button className={dutyActive ? 'duty-button active' : 'duty-button'} onClick={handleClickDuty}>
            {CALENDAR_TEXTS.duty}
          </button>
          <button className={annualActive ? 'annual-button active' : 'annual-button'} onClick={handleClickAnnual}>
            {CALENDAR_TEXTS.annual}
          </button>
        </FilterButtons>
      </WrapRight>
    </Container>
  );
};

export default CalendarHeader;

const Container = styled.div`
  width: calc(100% - 110px);
  height: 30px;
  display: flex;
  justify-content: space-between;

  .prev-button,
  .next-button,
  .calendar-button,
  .list-button {
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.gray};
    cursor: pointer;
  }

  .calendar-button,
  .prev-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }

  .list-button,
  .next-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const WrapLeft = styled.div`
  display: flex;
`;

const WrapRight = styled.div``;

const FilterButtons = styled.div`
  display: flex;
  gap: 5px;

  button {
    width: 45px;
    height: 30px;
    outline: none;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.gray};
    cursor: pointer;

    &.active {
      background-color: ${props => props.theme.primary};
      color: ${props => props.theme.white};
    }
  }
`;

const MonthWrapper = styled.div`
  margin-left: 70px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;
