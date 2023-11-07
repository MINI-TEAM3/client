/**
 * 0:00:00 형식의 시간 데이터를 00시간 00분으로 변환합니다.
 * @param data (0:00:00)
 * @returns (00시간 00분)
 */
export const convertTime = (data: string) => {
  const [hours, minutes] = data.split(':');

  return `${hours}시간 ${minutes}분`;
};
