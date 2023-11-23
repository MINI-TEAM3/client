import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarAnnualProps {
  arrAnnual: string[];
  date: dayjs.Dayjs;
  handleClickData: (date: dayjs.Dayjs, type: string) => void;
}

const CalendarAnnual = (props: CalendarAnnualProps) => {
  const { arrAnnual, date, handleClickData } = props;

  return (
    arrAnnual.length > 0 && <Annual onClick={() => handleClickData(date, 'annual')}>• 휴가{arrAnnual.length}명</Annual>
  );
};

export default CalendarAnnual;

const Annual = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  color: ${props => props.theme.secondary};
  font-weight: 400;
  font-size: 0.9rem;
  box-sizing: border-box;
  cursor: pointer;
`;
