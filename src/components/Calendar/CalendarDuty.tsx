import { getLevel } from '@/utils/decode';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarDutyProps {
  arrDuty: string[];
  date: dayjs.Dayjs;
  handleClickData: (date: dayjs.Dayjs, type: string) => void;
}

const CalendarDuty = (props: CalendarDutyProps) => {
  const { arrDuty, date, handleClickData } = props;

  return (
    arrDuty.length > 0 && (
      <Duty onClick={() => handleClickData(date, 'duty')}>
        <span className="duty-name">• {arrDuty[0]}</span>
        <span>{getLevel(arrDuty[1])}</span>
      </Duty>
    )
  );
};

export default CalendarDuty;

const Duty = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  font-weight: 400;
  color: ${props => props.theme.primary};
  box-sizing: border-box;
  font-size: 0.9rem;
  cursor: pointer;

  .duty-name {
    margin-right: 5px;
    font-weight: 700;
  }
`;
