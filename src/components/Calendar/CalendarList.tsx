import { useState } from 'react';
import { Schedule } from '@/lib/types';
import { getLevel } from '@/utils/decode';
import { getDataCategory } from '@/utils/getDataCategory';
import { CALENDAR_TEXTS } from '@/constants/calendar';
import ExelBtn from '@/components/Buttons/ExelBtn';
import dayjs from 'dayjs';
import styled from 'styled-components';

const CalendarList = ({ scheduleData }: { scheduleData: Schedule[] }) => {
  const [listData] = useState<Schedule[]>(scheduleData);

  const sortedData = [...listData].sort((a, b) => dayjs(a.startDate).diff(dayjs(b.startDate)));

  return (
    <Container>
      <Header>
        <ExelBtn data={sortedData} />
      </Header>
      <ListHead>
        <span className="category">{CALENDAR_TEXTS.category}</span>
        <span className="dept">{CALENDAR_TEXTS.dept}</span>
        <span className="name">{CALENDAR_TEXTS.name}</span>
        <span className="level">{CALENDAR_TEXTS.level}</span>
        <span className="date start-date">{CALENDAR_TEXTS.startDate}</span>
        <span className="date end-date">{CALENDAR_TEXTS.endDate}</span>
      </ListHead>
      <ListBody>
        {sortedData.map((data, index) => (
          <ListItem key={index} className={index % 2 === 0 ? 'line' : ''}>
            <span className="category">{getDataCategory(data.category)}</span>
            <span className="dept">{data.deptName}</span>
            <span className="name">{data.name}</span>
            <span className="level">{getLevel(data.level)}</span>
            <span className="date start-date">{data.startDate}</span>
            <span className="date end-date">{data.endDate}</span>
          </ListItem>
        ))}
      </ListBody>
    </Container>
  );
};

export default CalendarList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
`;

const ListHead = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.theme.gray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
    box-sizing: border-box;
  }

  .date {
    flex-grow: 1.5;
  }
  .category {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .end-date {
    padding-right: 17px;
  }
`;

const ListBody = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.gray};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid ${props => props.theme.gray};
  color: ${props => props.theme.black};

  &.line {
    background-color: ${props => props.theme.bgColor};
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
    height: 100%;
    border-right: 1px solid ${props => props.theme.gray};
  }

  .date {
    flex-grow: 1.5;
  }
  .category {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
`;
