import styled, { css } from 'styled-components';

import { useModal } from '@/hooks/useModal';
import { RequestModal } from '@/components/Modals/RequestModal';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { BtuttonData } from '@/lib/types';

const StyledButton = ({ type, size, onClick }: BtuttonData) => {
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

const getButtonColor = (type: string) => {
  let buttonColor: string;

  switch (type) {
    case 'annual':
      buttonColor = 'secondary';
      break;

    case 'onSchedule':
      buttonColor = 'lightgreen';
      break;

    case 'offSchedule':
      buttonColor = 'lightred';
      break;

    default:
      buttonColor = 'primary';
      break;
  }
  return css`
    background-color: ${props => props.theme[buttonColor]};
  `;
};

const getButtonBorder = (type: string) => {
  let buttonBorder: string;

  switch (type) {
    case 'onSchedule':
      buttonBorder = 'green';
      break;

    case 'offSchedule':
      buttonBorder = 'red';
      break;
  }
  return type === 'onSchedule' || type === 'offSchedule'
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
    case 'onSchedule':
      buttonTextColor = 'green';
      break;

    case 'offSchedule':
      buttonTextColor = 'red';
      break;
  }
  return type === 'onSchedule' || type === 'offSchedule'
    ? css`
        color: ${props => props.theme[buttonTextColor]};
      `
    : css`
        color: ${props => props.theme.white};
      `;
};

const getButtonSize = (size: string) => {
  let buttonSize: string = '';

  switch (size) {
    case 'big':
      buttonSize = '320px';
      break;

    case 'small':
      buttonSize = '120px';
      break;

    case 'nomal':
      buttonSize = '250px';
      break;
  }
  return css`
    width: ${buttonSize};
  `;
};

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
