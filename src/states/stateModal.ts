import { atom } from 'recoil';
import { ModalState } from '@/lib/types';

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
});
