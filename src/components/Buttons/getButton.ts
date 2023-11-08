import { css } from 'styled-components';

export const getButtonColor = (type: string) => {
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

export const getButtonBorder = (type: string) => {
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

export const getButtonTextColor = (type: string) => {
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

export const getButtonSize = (size: string) => {
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
