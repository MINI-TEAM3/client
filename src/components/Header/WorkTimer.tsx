import { UserDataState } from '@/states/stateUserdata';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const WorkTimer = () => {
  const UserData = useRecoilValue(UserDataState);

  const [count, setCount] = useState(0);
  const isWorking = UserData.flag;
  const workTime = UserData.workStart && UserData.workStart?.split('T')[1];
  const currentTime = String(new Date()).split(' ')[4];

  //현재 시간 초로 환산
  const [currentHours, currentMinutes, currentSeconds] = currentTime.split(':').map(Number);
  const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
  //출근 시간 초로 환산
  const [hours, minutes, seconds] = workTime ? workTime.split(':').map(Number) : [0, 0, 0];
  const workTimeSeconds = hours * 3600 + minutes * 60 + seconds;
  //현재시간 초에서 출근시간 초를 빼서 일한시간 구함
  const resultSeconds = currentTotalSeconds - workTimeSeconds;

  //일한 시간을 다시 xx:xx:xx 형식으로 바꿔줌
  const formatTime = () => {
    const totalSeconds = resultSeconds + count;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `
        ${String(hours).padStart(2, '0')}
        : ${String(minutes).padStart(2, '0')}
        : ${String(remainingSeconds).padStart(2, '0')}
        `;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimerContainer isWorking={isWorking}>
      <TimerBadge isWorking={isWorking}>{isWorking ? 'ON' : 'OFF'}</TimerBadge>
      {isWorking ? formatTime() : '00:00:00'}
    </TimerContainer>
  );
};

export default WorkTimer;

const TimerContainer = styled.div<{ isWorking: number }>`
  color: ${props => (props.isWorking ? 'green' : 'gray')};
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 8px;
`;

const TimerBadge = styled.div<{ isWorking: number }>`
  font-size: 10px;
  color: white;
  background-color: ${props => (props.isWorking ? 'green' : 'gray')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 20px;
  border-radius: 18px;
`;
