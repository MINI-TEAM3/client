export const PW_TEXTS = Object.freeze({
  title: '비밀번호 수정',
  PW: 'Password',
  newPW: 'New Password',
  newPWCheck: 'New Password Check',
  success: '비밀번호 변경이 완료되었습니다.\n다시 로그인하여 주시기 바랍니다.',
  edit: '수정하기',
  placeholder: {
    PW: '현재 비밀번호를 입력해 주세요.',
    newPW: '8자 이상의 새 비밀번호를 입력해 주세요.',
    newPWCheck: '새 비밀번호를 다시 입력해 주세요.',
  },
  validation: {
    newPW: {
      required: '새 비밀번호 입력은 필수 입력입니다.',
      message: '이전에 사용했던 비밀번호 입니다.',
    },
    newPWCheck: {
      required: '비밀번호 확인은 필수 입력입니다.',
      message: '비밀번호가 일치하지 않습니다.',
    },
  },
});
