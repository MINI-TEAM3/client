import styled from 'styled-components';

import { useModal } from '@/hooks/useModal';
import { RequestModal } from '@/components/Modals/RequestModal';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { ButtonData } from '@/lib/types';
import { getButtonBorder, getButtonColor, getButtonSize, getButtonTextColor } from '@/components/Buttons/getButton';

const StyledButton = ({ type, size, onClick }: ButtonData) => {
  const { openModal } = useModal();

  const modalData = {
    isOpen: true,
    title: BUTTON_TEXTS[type],
    content: <RequestModal type={type} />,
  };

  return (
    <>
      {type === 'annual' || type === 'duty' ? (
        <Container size={size} type={type} onClick={() => openModal(modalData)}>
          {BUTTON_TEXTS[type]}
        </Container>
      ) : (
        <Container size={size} type={type} onClick={onClick}>
          {BUTTON_TEXTS[type]}
        </Container>
      )}
    </>
  );
};

export default StyledButton;

const Container = styled.button<{ size: string; type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 8px;
  color: ${props => props.theme.white};
  ${({ type }) => getButtonColor(type)};
  ${({ type }) => getButtonBorder(type)};
  ${({ type }) => getButtonTextColor(type)};
  ${({ size }) => getButtonSize(size)};
`;
