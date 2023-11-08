import { ModalState } from '@/lib/types';
import { modalState } from '@/states/stateModal';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalDataState(prev => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState],
  );
  const openModal = useCallback(
    ({ title, content }: ModalState) =>
      setModalDataState({
        isOpen: true,
        title: title,
        content: content,
      }),
    [setModalDataState],
  );
  return { modalDataState, closeModal, openModal };
};
