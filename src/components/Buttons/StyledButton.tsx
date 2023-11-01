import { useModal } from '@/hooks/useModal';
import { RequestModal } from '@/components/Modals/RequestModal';
import { BUTTON_TEXTS } from '@/constants/buttons';
import styled, { css } from 'styled-components';

const StyledButton = ({ type, size }: { type: string; size: string }) => {
  const { openModal } = useModal();

  const modalData = {
    isOpen: true,
    title: BUTTON_TEXTS[type],
    content: <RequestModal type={type} />,
  };

  return (
    <>
      {type === 'onschedule' || type === 'offschedule' ? (
        <Container size={size} type={type}>
          {BUTTON_TEXTS[type]}
        </Container>
      ) : (
        <Container size={size} type={type} onClick={() => openModal(modalData)}>
          {BUTTON_TEXTS[type]}
        </Container>
      )}
    </>
  );
};

export default StyledButton;

const getButtonColor = (type: string) => {
  let buttonColor: string;

  switch (type) {
    case 'annual':
      buttonColor = 'secondary';
      break;

    case 'duty':
      buttonColor = 'primary';
      break;

    case 'onschedule':
      buttonColor = 'lightgreen';
      break;

    case 'offschedule':
      buttonColor = 'lightred';
      break;
  }
  return css`
    background-color: ${props => props.theme[buttonColor]};
  `;
};

const getButtonBorder = (type: string) => {
  let buttonBorder: string;

  switch (type) {
    case 'onschedule':
      buttonBorder = 'green';
      break;

    case 'offschedule':
      buttonBorder = 'red';
      break;
  }
  return type === 'onschedule' || type === 'onschedule'
    ? css`
        border: 2px solid ${props => props.theme[buttonBorder]};
      `
    : css`
        border: none;
      `;
};

const getButtonTextColor = (type: string) => {
  let buttonTextColor: string;

  switch (type) {
    case 'onschedule':
      buttonTextColor = 'green';
      break;

    case 'offschedule':
      buttonTextColor = 'red';
      break;
  }
  return type === 'onschedule' || type === 'onschedule'
    ? css`
        color: ${props => props.theme[buttonTextColor]};
      `
    : css`
        color: ${props => props.theme.white};
      `;
};

const Container = styled.button<{ size: string; type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size === 'big' ? '250px' : '120px')};
  height: 40px;
  border-radius: 8px;
  color: ${props => props.theme.white};
  ${({ type }) => getButtonColor(type)};
  ${({ type }) => getButtonBorder(type)};
  ${({ type }) => getButtonTextColor(type)};
`;
