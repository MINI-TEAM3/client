export const convertDay = (day: number) => {
  switch (day) {
    case 0:
      return '일';
      break;
    case 1:
      return '월';
      break;
    case 2:
      return '화';
      break;
    case 3:
      return '수';
      break;
    case 4:
      return '목';
      break;
    case 5:
      return '금';
      break;
    case 6:
      return '토';
      break;
    default:
      return false;
  }
};
