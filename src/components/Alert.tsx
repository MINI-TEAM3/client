import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertState } from '@/states/stateAlert';
import { IoAlertCircleOutline } from 'react-icons/Io5';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

const Alert = () => {
  const { isOpen, content } = useRecoilValue(alertState);
  const setAlert = useSetRecoilState(alertState);

  const onClickAlertClose = () => {
    setAlert({
      isOpen: false,
      content: '',
      type: 'error',
    });
  };

  return (
    isOpen && (
      <Background onClick={onClickAlertClose}>
        <Container>
          <IconWrap>
            <IoAlertCircleOutline />
          </IconWrap>
          <Contents>{content}</Contents>
          <ButtonWrap onClick={onClickAlertClose}>
            <Btn content="확인" />
          </ButtonWrap>
        </Container>
      </Background>
    )
  );
};

export default Alert;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 400px;
  height: 250px;
  padding: 46px 46px 56px 46px;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  z-index: 10;
`;

const IconWrap = styled.div`
  display: flex;
  width: 50px;
  height: 50px;

  svg {
    width: 100%;
    height: 100%;
    color: ${props => props.theme.red};
  }
`;

const Contents = styled.div`
  display: flex;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  margin-bottom: 56px;
`;
