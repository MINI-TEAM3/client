import { BUTTON_TEXTS } from '@/constants/buttons';
import styled from 'styled-components';

const ApplyBtn = () => {
  return <Container>{BUTTON_TEXTS.approve}</Container>;
};

export default ApplyBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 26px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
