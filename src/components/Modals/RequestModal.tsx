import { styled } from 'styled-components';
import Btn from '@/components/Buttons/Btn';
import { useForm } from 'react-hook-form';
import { createAnnual, editAnnual, editDuty, getDuty } from '@/lib/api';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import CheckModal from './checkModal';
import { useRecoilValue } from 'recoil';
import { scheduleIdState } from '@/states/stateScheduleId';
import { DataBody } from '@/lib/types';

export const RequestModal = ({ type }: { type: string }) => {
  const scheduleId = useRecoilValue(scheduleIdState);
  const { openModal, closeModal } = useModal();
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register } = useForm<DataBody>();

  const modalData = {
    isOpen: true,
    title: '신청이 완료되었습니다!',
    content: <CheckModal type={'request'} />,
  };

  const onSubmit = async (data: DataBody) => {
    setErrorMessage('');
    if (type === 'annual') {
      try {
        await createAnnual({
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
        });
        closeModal();
        openModal(modalData);
      } catch (error) {
        setErrorMessage('연차 등록 요청에 실패하였습니다.');
        console.error('연차 등록 요청 실패', error);
      }
    }
    if (type === 'duty') {
      console.log(data.startDate, data.endDate);
      try {
        const res = await getDuty(data.startDate.toString());
        const scheduleIds = res.item.id;

        if (scheduleIds !== 0) {
          try {
            await editDuty({ startDate: data.startDate, updateDate: data.endDate }, scheduleIds);
            closeModal();
            openModal(modalData);
          } catch (error) {
            setErrorMessage('당직 변경 요청에 실패하였습니다.');
            console.error('당직 변경 요청 실패', error);
          }
        } else {
          setErrorMessage('기존 날짜에 당직 스케쥴이 없습니다.');
        }
      } catch (error) {
        setErrorMessage('기존 날짜에 당직 스케쥴이 없습니다.');
        console.error('기존 날짜에 당직 스케쥴이 없습니다.', error);
      }
    }
    if (type === 'annualEdit') {
      try {
        await editAnnual(
          {
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
          },
          scheduleId,
        );
        closeModal();
        openModal(modalData);
      } catch (error) {
        setErrorMessage('연차 수정 요청에 실패하였습니다.');
        console.error('연차 수정 요청 실패', error);
      }
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <div className="inputTitle">{type === 'duty' ? '기존 날짜' : '휴가 시작일'}</div>
        <input type="date" {...register('startDate')} />
      </InputContainer>
      <InputContainer>
        <div className="inputTitle">{type === 'duty' ? '변경 희망 날짜' : '휴가 종료일'}</div>
        <input type="date" {...register('endDate')} />
      </InputContainer>
      {(type === 'annual' || type === 'annualEdit') && (
        <InputContainer>
          <div className="inputTitle">신청 사유</div>
          <textarea className="reasonBox" {...register('reason')} />
        </InputContainer>
      )}
      {errorMessage && (
        <InfoBox>
          <FiAlertCircle />
          <span className="info-text">{errorMessage}</span>
        </InfoBox>
      )}
      <Btn content={'신청하기'} />
    </Container>
  );
};

const Container = styled.form`
  margin-top: 32px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  button {
    margin-top: 24px;
  }
`;

const InputContainer = styled.div`
  .inputTitle {
    color: ${props => props.theme.gray};
    margin-bottom: 8px;
    font-family: 'ABeeZee', sans-serif;
  }
  .reasonBox {
    box-sizing: border-box;
    height: 92px;
    width: 320px;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s;
    resize: none;
    &:focus {
      outline: none;
      border: 1px solid ${props => props.theme.secondary};
      box-shadow: 0 0 6px 3px rgba(156, 184, 255, 0.3);
    }
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 14px;
  .info-text {
    margin-left: 8px;
  }
`;
