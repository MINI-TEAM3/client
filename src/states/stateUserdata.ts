import { UserData } from '@/lib/types';
import { atom } from 'recoil';

export const UserDataState = atom<UserData>({
  key: 'userData',
  default: {
    id: 0,
    empNo: 0,
    name: '',
    email: '',
    phone: '',
    hospitalId: 0,
    deptId: 0,
    level: '',
    auth: '',
    status: '',
    annual: 0,
    duty: 0,
    profileImageUrl: '',
    hireDate: '',
    workStart: '',
    flag: 0,
    createdAt: '',
    updatedAt: '',
  },
});
