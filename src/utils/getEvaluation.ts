export const getEvaluation = (evaluation: string) => {
  if (evaluation === 'STANDBY') {
    return '대기';
  } else if (evaluation === 'APPROVED' || evaluation === 'COMPLETED') {
    return '승인';
  } else if (evaluation === 'REJECTED') {
    return '반려';
  } else if (evaluation === 'CANCELED') {
    return '취소';
  }
};
