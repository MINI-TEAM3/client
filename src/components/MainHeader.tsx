import { hospitalDecode } from '@/utils/decode';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserDataState } from '@/states/stateUserdata';
import { useEffect, useState } from 'react';

const MainHeader = () => {
  const UserData = useRecoilValue(UserDataState);
  const hospitalNum = UserData.hospitalId;
  const [count, setCount] = useState(0);

  const workTime = '09:08:22';
  const [hours, minutes, seconds] = workTime.split(':').map(Number);
  const workTimeSecond = hours * 3600 + minutes * 60 + seconds;

  const formatTime = () => {
    const totalSeconds = workTimeSecond + count;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `
    ${String(hours).padStart(2, '0')}
    :${String(minutes).padStart(2, '0')}
    :${String(remainingSeconds).padStart(2, '0')}
    `;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <TimerContainer>
        {formatTime()}
        <TimerBadge>off</TimerBadge>
      </TimerContainer>
      <HosPitalName>
        <MdOutlineLocalHospital />
        {hospitalNum && <span className="hospital-name">{hospitalDecode[hospitalNum].hospital}</span>}
      </HosPitalName>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 70px;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPitalName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const TimerContainer = styled.div`
  color: darkblue;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 8px;
`;
const TimerBadge = styled.div`
  color: white;
  background-color: darkblue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  border-radius: 18px;
`;
