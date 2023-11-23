/**
 * 0:00:00 7일 6주로 달력 날짜를 생성합니다.
 * @param firstDate (월의 시작일)
 * @returns days (해당 월의 모든 날짜가 담긴 배열)
 */
import dayjs from 'dayjs';

export const createCalendarDays = (firstDate: dayjs.Dayjs) => {
  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = firstDate.add(i, 'day');
    days.push(day);
  }
  return days;
};
