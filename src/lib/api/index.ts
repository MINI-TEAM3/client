import axios from 'axios';
import {
  LoginBody,
  SignUpBody,
  EditMyPageBody,
  EditPasswordBody,
  CreateAnnualBody,
  EditAnnualBody,
  CancelAnnualBody,
  CreateDutyBody,
  EditDutyBody,
} from '@/lib/types';

const { VITE_BASE_URL } = import.meta.env;

const host = window.location.hostname === 'localhost' ? VITE_BASE_URL : 'api';

const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인
export const login = async (body: LoginBody) => {
  const res = await instance.post('/user/login', body);
  return res;
};

// 로그아웃
export const logout = async () => {
  const res = await instance.post('/user/logout');
  return res.data;
};

// 회원가입
export const signUp = async (body: SignUpBody) => {
  const res = await instance.post('/user/register', body);
  return res.data;
};

// 마이페이지
export const getMyPage = async () => {
  const res = await instance.get('/user/myPage', {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 마이페이지 수정
export const editMyPage = async (body: EditMyPageBody) => {
  const res = await instance.post('/user/editUser', body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 비밀번호 변경
export const editPassword = async (body: EditPasswordBody) => {
  const res = await instance.post('/user/updatePassword', body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 메인 캘린더 조회
export const getSchedule = async () => {
  const res = await instance.get('/schedule/', {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 날짜별 휴가 인원 조회
export const getAnnual = async (date: string) => {
  const res = await instance.get(`/schedule/date?chooseDate=${date}&category=ANNUAL`, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 날짜별 당직 인원 조회
export const getDuty = async (date: string) => {
  const res = await instance.get(`/schedule/date?chooseDate=${date}&category=DUTY`, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 요청 내역 확인
export const getRequest = async (userId: number) => {
  const res = await instance.get(`/schedule/${userId}`, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 연차 등록
export const createAnnual = async (body: CreateAnnualBody) => {
  const res = await instance.post('/schedule/create/annual', body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 연차 내용 수정
export const editAnnual = async (body: EditAnnualBody, scheduleId: number) => {
  const res = await instance.post(`/schedule/annual/${scheduleId}/update`, body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 연차 신청 취소
export const cancelAnnual = async (scheduleId: number, body: CancelAnnualBody) => {
  const res = await instance.post(`/schedule/annual/delete?id=${scheduleId}`, body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 당직 등록 (사용 여부 체크!)
export const createDuty = async (body: CreateDutyBody) => {
  const res = await instance.post('/schedule/create/duty', body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 당직 내용 수정
export const editDuty = async (body: EditDutyBody, scheduleId: number) => {
  const res = await instance.post(`/schedule/duty/${scheduleId}/update`, body, {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 병원 정보 리스트
export const getHospitalList = async () => {
  const res = await instance.get('/hospital');
  return res.data;
};

// 병원 과 리스트
export const getDeptList = async (hospitalId: number) => {
  const res = await instance.get(`/dept/${hospitalId}/list`);
  return res.data;
};

// type schedulebody = {
//   id: number;
// };

//출근
export const scheduleOn = async () => {
  try {
    await instance.post('/schedule/on', null, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    console.error('출근 기록 실패', error);
  }
};

//퇴근
export const scheduleOff = async () => {
  try {
    await instance.post('/schedule/off', null, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    console.error('퇴근 기록 실패', error);
  }
};
