import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAttendance } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { alertState } from '@/states/stateAlert';
import { ATTENDANCE_TEXTS } from '@/constants/attendance';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import DashBoard from '@/components/DashBoard';
import styled from 'styled-components';

const Attendance = () => {
  const [dashBoardData, setDashBoardData] = useState({
    dayWork: '0:00:00',
    weekWork: '0:00:00',
    monthWork: '0:00:00',
  });
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(alertState);

  // 근무 관리 데이터 호출
  const getAttendanceData = async () => {
    try {
      setIsLoading(true);
      const res = await getAttendance();
      if (res.success) {
        setDashBoardData(res.item);
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `근무 관리 데이터 호출 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <Title>
        <h2>{ATTENDANCE_TEXTS.title}</h2>
      </Title>
      <DashBoard data={dashBoardData} />
    </Container>
  );
};

export default Attendance;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 70px 40px 70px;
`;

const Title = styled.div`
  display: flex;
  h2 {
    font-weight: 600;
  }
`;
