import { BUTTON_TEXTS } from '@/constants/buttons';
import styled from 'styled-components';

const RejectBtn = () => {
  return <Container>{BUTTON_TEXTS.reject}</Container>;
};

export default RejectBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 26px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.red};
  color: ${props => props.theme.white};
`;
