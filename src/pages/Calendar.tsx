import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { getSchedule } from '@/lib/api';
import { Schedule, AlertState } from '@/lib/types';
import { alertState } from '@/states/stateAlert';
import CalendarHeader from '@/components/Calendar/CalendarHeader';
import CalendarBody from '@/components/Calendar/CalendarBody';
import CalendarList from '@/components/Calendar/CalendarList';
import ToggleButton from '@/components/Calendar/ToggleButton';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<Schedule[]>();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [toggleButton, setToggleButton] = useState(true);
  const [dutyActive, setDutyActive] = useState(true);
  const [annualActive, setAnnualActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(alertState);

  const navigate = useNavigate();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getScheduleData = async () => {
    try {
      setIsLoading(true);
      const res = await getSchedule();
      if (res.success) {
        setScheduleData(res.item);
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `메인 캘린더 조회 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.getItem('authToken') ? getScheduleData() : navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <Alert />
      <WrapHeader>
        {toggleButton && (
          <CalendarHeader
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            dutyActive={dutyActive}
            annualActive={annualActive}
            setDutyActive={setDutyActive}
            setAnnualActive={setAnnualActive}
          />
        )}
        <ToggleButton toggleButton={toggleButton} setToggleButton={setToggleButton} />
      </WrapHeader>
      <WrapBody>
        {scheduleData &&
          (toggleButton ? (
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
            <CalendarList scheduleData={scheduleData} />
          ))}
      </WrapBody>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 1100px;
  height: calc(100% - 64px);
  padding: 0 70px 20px 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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

const WrapHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
`;

const WrapBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  box-sizing: border-box;
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${props => props.theme.gray};
  color: ${props => props.theme.gray};
  font-weight: 500;
  box-sizing: border-box;
  &:last-child {
    padding-right: 0.5px;
    border-right: none;
  }
`;
