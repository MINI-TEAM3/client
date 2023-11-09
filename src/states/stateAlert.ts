import { atom } from 'recoil';
import { AlertState } from '@/lib/types';

export const alertState = atom<AlertState>({
  key: 'alertState',
  default: {
    isOpen: false,
    content: '',
    type: 'error',
  },
});
