import React from 'react';
import { DashBoardProps } from '@/lib/types';
import { DASH_BOARD_TEXTS } from '@/constants/dashBoard';
import { convertTime } from '@/utils/convertTime';
import styled from 'styled-components';

const DashBoard = React.memo(({ data }: DashBoardProps) => {
  const { dayWork, weekWork, monthWork } = data;

  return (
    <Container>
      <TodayPart>
        <Title>{DASH_BOARD_TEXTS.day.title}</Title>
        <Data>{convertTime(dayWork)}</Data>
        <Description>{DASH_BOARD_TEXTS.day.description}</Description>
      </TodayPart>
      <WeekPart>
        <Title>{DASH_BOARD_TEXTS.week.title}</Title>
        <Data>{convertTime(weekWork)}</Data>
        <Description>{DASH_BOARD_TEXTS.week.description}</Description>
      </WeekPart>
      <MonthPart>
        <Title>{DASH_BOARD_TEXTS.month.title}</Title>
        <Data>{convertTime(monthWork)}</Data>
        <Description>{DASH_BOARD_TEXTS.month.description}</Description>
      </MonthPart>
    </Container>
  );
});

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

const TodayPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WeekPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MonthPart = styled.div`
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
