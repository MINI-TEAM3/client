import { useEffect, useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAttendance } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { alertState } from '@/states/stateAlert';
import { ATTENDANCE_TEXTS, ATTENDANCE_COLUMN } from '@/constants/attendance';
import { convertDay } from '@/utils/convertDay';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import DashBoard from '@/components/DashBoard';
import GridTable from '@/components/Table/GridTable';
import styled from 'styled-components';

const Attendance = () => {
  const [dashBoardData, setDashBoardData] = useState({
    dayWork: '0:00:00',
    weekWork: '0:00:00',
    monthWork: '0:00:00',
  });
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState('0000년 00월 00일 (0)');
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(alertState);

  // 근무 관리 데이터 호출
  const getAttendanceData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAttendance();
      if (res.success) {
        setDashBoardData(res.item);
        setTableData(res.item.works);
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
  }, [getAttendance]);

  // 오늘 날짜 구하기
  const getTodayDate = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const day = convertDay(new Date().getDay());

    return setDate(`${year}년 ${month + 1}월 ${date}일 (${day})`);
  };

  useEffect(() => {
    getAttendanceData();
    getTodayDate();
  }, []);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <TitleContainer>
        <Title>
          <h2>{ATTENDANCE_TEXTS.title}</h2>
        </Title>
        <SubTitle>{date}</SubTitle>
      </TitleContainer>
      <DashBoard data={dashBoardData} />
      {tableData && <GridTable rowData={tableData} columnsData={ATTENDANCE_COLUMN} />}
    </Container>
  );
};

export default Attendance;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 70px 40px 70px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  h2 {
    font-weight: 600;
    margin: 0;
  }
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;
