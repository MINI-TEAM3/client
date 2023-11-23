import { useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import { CalAnnualModal } from '@/components/Modals/CalAnnualModal';
import { CalDutylModal } from '@/components/Modals/CalDutyModal';
import { Schedule } from '@/lib/types';
import { createCalendarDays } from '@/utils/createCalendarDays';
import CalendarDuty from '@/components/Calendar/CalendarDuty';
import CalendarAnnual from '@/components/Calendar/CalendarAnnual';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarBodyProps {
  scheduleData: Schedule[];
  currentMonth: dayjs.Dayjs;
  dutyactive: boolean;
  annualactive: boolean;
}

const CalendarBody = (props: CalendarBodyProps) => {
  const { scheduleData, currentMonth, dutyactive, annualactive } = props;
  const DATE_FORMAT = 'YYYY-MM-DD';
  const monthStart = currentMonth.startOf('month');
  const firstDayOfMonth = monthStart.day();
  const firstDate = monthStart.subtract(firstDayOfMonth, 'day');
  const calendarDays = createCalendarDays(firstDate);

  // 클릭한 유형별 모달창 열기
  const { openModal } = useModal();
  const handleClickData = useCallback(
    (date: dayjs.Dayjs, type: string) => {
      const clickDate = date.format(DATE_FORMAT);
      let modalTitle: string = '';
      let modalContent: JSX.Element | string = '';

      if (type === 'duty') {
        modalTitle = '금일 응급실 당직';
        modalContent = <CalDutylModal date={clickDate} />;
      } else if (type === 'annual') {
        modalTitle = '금일 휴가 인원';
        modalContent = <CalAnnualModal date={clickDate} />;
      }

      const modalData = {
        isOpen: true,
        title: modalTitle,
        content: modalContent,
      };
      openModal(modalData);
    },
    [openModal],
  );

  // 달력 셀 별 스타일
  const getCellStyle = useCallback(
    (dateObj: dayjs.Dayjs, index: number) => {
      const baseClass = 'dates';
      const isDifferentMonth = dateObj.format('M') !== currentMonth.format('M');
      const isToday = dateObj.isSame(dayjs(), 'day');
      const isLastColumn = index % 7 === 6;
      const isLastRow = 34 < index && index < 42;

      if (isDifferentMonth) {
        if (isLastRow) return `${baseClass} outdate lastline`;
        if (isLastColumn) return `${baseClass} outdate rightline`;
        return `${baseClass} outdate`;
      } else {
        if (isToday) return `${baseClass} today`;
        if (isLastRow) return `${baseClass} lastline`;
        if (isLastColumn) return `${baseClass} rightline`;
        return baseClass;
      }
    },
    [currentMonth],
  );

  const mapToDate = useCallback(
    (getDate: dayjs.Dayjs[], scheduleData: Schedule[]) => {
      return getDate.map((date, index) => {
        const dateObj = dayjs(date);
        const arrAnnual: string[] = [];
        const arrDuty: string[] = [];
        const formattedDate = dateObj.format(DATE_FORMAT);

        Object.keys(scheduleData).map(item => {
          const index = parseInt(item, 10);
          const cal = scheduleData[index];

          // 휴가 출력
          const handleAnnual = () => {
            if (dayjs(cal.endDate).diff(cal.startDate, 'day') > 0) {
              const diffInDays = dayjs(cal.endDate).diff(cal.startDate, 'day');

              const dateRange = [];
              for (let i = 0; i <= diffInDays; i++) {
                const item = dayjs(cal.startDate).add(i, 'day').format(DATE_FORMAT);
                dateRange.push(item);
                if (item === formattedDate) {
                  arrAnnual.push(item);
                }
              }
            } else {
              if (cal.startDate === formattedDate) {
                arrAnnual.push(String(cal.id));
              }
            }
          };

          // 당직 출력
          const handleDuty = () => {
            if (cal.endDate === formattedDate) {
              arrDuty.push(cal.name, cal.level);
            }
          };

          if (cal.category === 'ANNUAL') {
            handleAnnual();
          } else if (cal.category === 'DUTY') {
            handleDuty();
          }
        });

        const className = getCellStyle(dateObj, index);

        return (
          <div key={index} className={className}>
            <span className="calendar-date">{dateObj.format('D')}</span>
            {dutyactive && <CalendarDuty arrDuty={arrDuty} date={dateObj} handleClickData={handleClickData} />}
            {annualactive && <CalendarAnnual arrAnnual={arrAnnual} date={dateObj} handleClickData={handleClickData} />}
          </div>
        );
      });
    },
    [dutyactive, annualactive, handleClickData, getCellStyle],
  );

  return <Container>{mapToDate(calendarDays, scheduleData)}</Container>;
};
export default CalendarBody;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 100%;
  border-right: 1px solid ${props => props.theme.gray};
  border-left: 1px solid ${props => props.theme.gray};
  border-bottom: 1px solid ${props => props.theme.gray};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
  .dates {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.gray};
    border-right: 1px solid ${props => props.theme.gray};
    padding: 5px;
    font-weight: 700;
    //날짜
    .calendar-date {
      position: absolute;
      top: 5px;
      left: 5px;
    }
    &.today {
      border: 3px solid ${props => props.theme.secondary};
      .calendar-date {
        display: flex;
        color: ${props => props.theme.primary};
        margin-left: -3px;
        margin-top: -3px;
      }
    }
    &.outdate {
      color: #c9c8c8;
    }
    &.lastline {
      border-bottom: none;
    }
    &.rightline {
      border-right: none;
    }
    &:nth-child(42) {
      border-right: none;
    }
  }
`;
