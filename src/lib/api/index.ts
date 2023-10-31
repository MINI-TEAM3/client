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
  try {
    const res = await instance.post('/user/login', body);
    return res;
  } catch (error) {
    console.error('로그인 실패', error);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const res = await instance.post('/user/logout');
    return res.data;
  } catch (error) {
    console.error('로그아웃 실패');
  }
};

// 회원가입
export const signUp = async (body: SignUpBody) => {
  try {
    const res = await instance.post('/user/register', body);
    return res.data;
  } catch (error) {
    console.error('회원가입 실패', error);
  }
};

// 마이페이지
export const getMyPage = async () => {
  try {
    const res = await instance.get('/user/myPage', {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('마이페이지 조회 실패', error);
  }
};

// 마이페이지 수정
export const editMyPage = async (body: EditMyPageBody) => {
  try {
    const res = await instance.post('/user/editUser', body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('마이페이지 수정 실패', error);
  }
};

// 비밀번호 변경
export const editPassword = async (body: EditPasswordBody) => {
  try {
    const res = await instance.post('/user/updatePassword', body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('비밀번호 변경 실패', error);
  }
};

// 메인 캘린더 조회
export const getSchedule = async () => {
  try {
    const res = await instance.get('/schedule/', {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('캘린더 조회 실패', error);
  }
};

// 날짜별 휴가 인원 조회
export const getAnnual = async (date: string) => {
  try {
    const res = await instance.get(`/schedule/date?chooseDate=${date}&category=ANNUAL`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('휴가 인원 조회 실패', error);
  }
};

// 날짜별 당직 인원 조회
export const getDuty = async (date: string) => {
  try {
    const res = await instance.get(`/schedule/date?chooseDate=${date}&category=DUTY`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('당직 인원 조회 실패', error);
  }
};

// 요청 내역 확인
export const getRequest = async (userId: number) => {
  try {
    const res = await instance.get(`/schedule/${userId}`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('요청 내역 확인 실패', error);
  }
};

// 연차 등록
export const createAnnual = async (body: CreateAnnualBody) => {
  try {
    const res = await instance.post('/schedule/create/annual', body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('연차 등록 요청 실패', error);
    throw error;
  }
};

// 연차 내용 수정
export const editAnnual = async (body: EditAnnualBody, scheduleId: number) => {
  try {
    const res = await instance.post(`/schedule/annual/${scheduleId}/update`, body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('연차 내용 수정 실패', error);
  }
};

export const cancelAnnual = async (scheduleId: number, body: CancelAnnualBody) => {
  try {
    const res = await instance.post(`/schedule/annual/delete?id=${scheduleId}`, body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('연차 신청 취소 실패', error);
  }
};

// 당직 등록 (사용 여부 체크!)
export const createDuty = async (body: CreateDutyBody) => {
  try {
    const res = await instance.post('/schedule/create/duty', body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('당직 등록 실패', error);
  }
};

// 당직 내용 수정
export const editDuty = async (body: EditDutyBody, scheduleId: number) => {
  try {
    const res = await instance.post(`/schedule/duty/${scheduleId}/update`, body, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('당직 내용 수정 실패', error);
    throw error;
  }
};

// 병원 정보 리스트
export const getHospitalList = async () => {
  try {
    const res = await instance.get('/hospital/list');
    return res.data;
  } catch (error) {
    console.error('병원 정보 리스트 조회 실패', error);
  }
};

// 병원 과 리스트
export const getDeptList = async (hospitalId: number) => {
  try {
    const res = await instance.get(`/dept/${hospitalId}/list`);
    return res.data;
  } catch (error) {
    console.error('병원 과 리스트 조회 실패', error);
  }
};
