/**
 * yyyy-mm-ddThh:mm:ss 형식의 시간 데이터를 분리합니다.
 * @param data (yyyy-mm-ddThh:mm:ss)
 * @returns (yyyy-mm-dd,hh:mm:ss, hh:mm)
 */
export const splitTimeStamp = (time: string, type: string) => {
  if (time === null) return '-';
  const data = time.split('T');

  if (type === 'date') {
    return data[0];
  } else if (type === 'hh:mm:ss') {
    return data[1];
  } else if (type === 'hh:mm') {
    const timePattern = /(\d{2,3}:\d{2}):\d{2}/;
    const match = data[1].match(timePattern);
    if (match && match[1]) {
      return match[1];
    }
  }
};
