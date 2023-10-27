import { ATTENDANCE_TEXTS } from '@/constants/attendance';
import DashBoard from '@/components/DashBoard';
import styled from 'styled-components';

const Attendance = () => {
  return (
    <Container>
      <Title>
        <h2>{ATTENDANCE_TEXTS.title}</h2>
      </Title>
      <DashBoard day="9시간 20분" week="85시간 30분" month="123시간 50분" />
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
