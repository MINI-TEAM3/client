import { useModal } from '@/hooks/useModal';
import { RequestModal } from '@/components/Modals/RequestModal';
import { BUTTON_TEXTS } from '@/constants/buttons';
import styled from 'styled-components';

const AnnualBtn = () => {
  const { openModal } = useModal();

  const modalData = {
    isOpen: true,
    title: '휴가 신청',
    content: <RequestModal type={'annual'} />,
  };

  return <Container onClick={() => openModal(modalData)}>{BUTTON_TEXTS.annual}</Container>;
};

export default AnnualBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.white};
`;
