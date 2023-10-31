import styled from 'styled-components';
import { DASH_BOARD_TEXTS } from '@/constants/dashBoard';
import { DashBoardProps } from '@/lib/types';

const DashBoard = ({ day = '-', week = '-', month = '-' }: DashBoardProps) => {
  return (
    <Container>
      <Part>
        <Title>{DASH_BOARD_TEXTS.day.title}</Title>
        <Data>{day}</Data>
        <Description>{DASH_BOARD_TEXTS.day.description}</Description>
      </Part>
      <Line />
      <Part>
        <Title>{DASH_BOARD_TEXTS.week.title}</Title>
        <Data>{week}</Data>
        <Description>{DASH_BOARD_TEXTS.week.description}</Description>
      </Part>
      <Line />
      <Part>
        <Title>{DASH_BOARD_TEXTS.month.title}</Title>
        <Data>{month}</Data>
        <Description>{DASH_BOARD_TEXTS.month.description}</Description>
      </Part>
    </Container>
  );
};

export default DashBoard;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 205px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 6px;
  background-color: ${props => props.theme.white};
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Data = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: ${props => props.theme.primary};
`;

const Description = styled.span`
  font-size: 12px;
  color: ${props => props.theme.gray};
`;

const Line = styled.div`
  height: 120px;
  border: 0.5px solid ${props => props.theme.gray};
`;
