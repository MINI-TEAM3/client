import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getSchedule } from '@/lib/api';
import { Schedule } from '@/lib/types';
import { CALENDAR_TEXTS } from '@/constants/calendar';
import CalendarBody from '@/components/Calendar/CalendarBody';
import CalendarList from '@/components/Calendar/CalendarList';
import Loading from '@/components/Loading';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<Schedule[]>();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [toggleButton, setToggleButton] = useState(true);
  const [dutyActive, setDutyActive] = useState(false);
  const [annualActive, setAnnualActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getSchedule();
    setScheduleData(data.item);
    setIsLoading(false);
  };

  useEffect(() => {
    !localStorage.getItem('authToken') && navigate('/login');
    if (localStorage.getItem('authToken')) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.add(1, 'month'));
  };

  const handleClickToggle = () => {
    setToggleButton(!toggleButton);
  };

  const handleClickToday = () => {
    setCurrentMonth(dayjs(dayjs().format('YYYY-MM-DD')));
  };

  const handleClickDuty = () => {
    setDutyActive(!dutyActive);
  };

  const handleClickAnnual = () => {
    setAnnualActive(!annualActive);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <ToggleButton>
        <Button
          className={toggleButton ? 'calendar-button active' : 'calendar-button'}
          onClick={handleClickToggle}
          disabled={!scheduleData}
        >
          {CALENDAR_TEXTS.calendar}
        </Button>
        <Button
          className={toggleButton ? 'list-button' : 'list-button active'}
          onClick={handleClickToggle}
          disabled={!scheduleData}
        >
          {CALENDAR_TEXTS.list}
        </Button>
      </ToggleButton>
      {toggleButton ? (
        <>
          <button className="today-button" onClick={handleClickToday} disabled={!scheduleData}>
            {CALENDAR_TEXTS.today}
          </button>
          <FilterButtons>
            <button
              className={dutyActive ? 'duty-button active' : 'duty-button'}
              onClick={handleClickDuty}
              disabled={!scheduleData}
            >
              {CALENDAR_TEXTS.duty}
            </button>
            <button
              className={annualActive ? 'annual-button active' : 'annual-button'}
              onClick={handleClickAnnual}
              disabled={!scheduleData}
            >
              {CALENDAR_TEXTS.annual}
            </button>
          </FilterButtons>
          <Header>
            <CalendarButtons>
              <button className="prev-button" onClick={prevMonth} disabled={!scheduleData}>
                &lt;
              </button>
              <button className="next-button" onClick={nextMonth} disabled={!scheduleData}>
                &gt;
              </button>
              <MonthWrapper>{currentMonth.format('YYYY년 M월')}</MonthWrapper>
            </CalendarButtons>
          </Header>
          {scheduleData ? (
            <>
              <Weeks>
                {weekDays.map(day => (
                  <Week className="weeks" key={day}>
                    <div>{day}</div>
                  </Week>
                ))}
              </Weeks>
              <CalendarBody
                scheduleData={scheduleData}
                currentMonth={currentMonth}
                dutyactive={dutyActive}
                annualactive={annualActive}
              />
            </>
          ) : (
            <>
              <Weeks></Weeks>
              <WeekLoading></WeekLoading>
            </>
          )}
        </>
      ) : scheduleData ? (
        <CalendarList scheduleData={scheduleData} />
      ) : (
        ''
      )}
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 1100px;
  height: calc(100% - 64px);
  padding: 0 70px 40px 70px;
  box-sizing: border-box;

  .today-button {
    position: absolute;
    left: 168px;
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 4px;
    color: ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    cursor: pointer;
  }
`;

const WeekLoading = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  border-right: 1px solid ${props => props.theme.gray};
  border-left: 1px solid ${props => props.theme.gray};
  border-bottom: 1px solid ${props => props.theme.gray};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
`;

const ToggleButton = styled.div`
  position: absolute;
  right: 70px;
`;

const Button = styled.button`
  height: 30px;
  border: none;
  outline: none;
  border: 1px solid ${props => props.theme.gray};
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.gray};
  cursor: pointer;

  &.calendar-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  &.list-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &.active {
    border: 2px solid ${props => props.theme.primary};
    background-color: rgba(37, 64, 135, 0.3);
    color: ${props => props.theme.primary};
  }
`;

const FilterButtons = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  margin-right: 190px;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;

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

const CalendarButtons = styled.div`
  display: flex;
`;

const MonthWrapper = styled.div`
  margin-left: 70px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const Weeks = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-left: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
  border-right: 1px solid ${props => props.theme.gray};
  margin-top: 20px;
  background-color: ${props => props.theme.white};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-right: 1px solid ${props => props.theme.gray};
    color: ${props => props.theme.gray};
    font-weight: 500;

    &:last-child {
      padding-right: 1px;
      border-right: none;
    }
  }
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
`;
