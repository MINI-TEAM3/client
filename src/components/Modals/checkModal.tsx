import { MODAL_TEXTS } from '@/constants/modals';
import { useModal } from '@/hooks/useModal';
import { cancelAnnual } from '@/lib/api';
import { useNavigate } from 'react-router';
import Alert from '@/components/Alert';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { AlertState } from '@/lib/types';
import { alertState } from '@/states/stateAlert';

const CheckModal = ({ type }: { type: string | number }) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const setAlert = useSetRecoilState<AlertState>(alertState);

  const destination = `/${type}`;

  const handleOnClickYes = async () => {
    if (typeof type === 'number') {
      try {
        const res = await cancelAnnual(type, { id: type });
        if (res.success) {
          closeModal();
          location.reload();
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `연차 신청 취소 실패\n${error}`,
          type: 'error',
        });
      }
    } else {
      closeModal();
      navigate(destination);
      location.reload();
    }
  };

  return (
    <Container>
      <Alert />
      {typeof type === 'string' && <div>{MODAL_TEXTS.check}</div>}
      <BtnWrap>
        <AnswerBtn className="yseBtn" onClick={() => handleOnClickYes()}>
          {MODAL_TEXTS.yes}
        </AnswerBtn>
        <AnswerBtn className="noBtn" onClick={() => closeModal()}>
          {MODAL_TEXTS.no}
        </AnswerBtn>
      </BtnWrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 32px;

  div {
    margin-bottom: 32px;
  }
`;
const BtnWrap = styled.div`
  justify-content: center;
  display: flex;
  gap: 32px;
`;
const AnswerBtn = styled.button`
  width: 70px;
  height: 34px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  &.yseBtn {
    color: ${props => props.theme.white};
    background: ${props => props.theme.primary};
  }
  &.noBtn {
    color: ${props => props.theme.gray};
    background: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.gray};
  }
`;

export default CheckModal;
