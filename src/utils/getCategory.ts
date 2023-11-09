export const getCategory = (category: string, evaluation: string) => {
  if (category === 'DUTY' && evaluation !== 'APPROVED') {
    return '당직 변경 신청';
  } else if (category === 'DUTY' && evaluation === 'APPROVED') {
    return '당직';
  } else {
    return '휴가 신청';
  }
};
