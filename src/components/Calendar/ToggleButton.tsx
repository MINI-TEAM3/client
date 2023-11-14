import { CALENDAR_TEXTS } from '@/constants/calendar';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

export interface ToogleButtonProps {
  toggleButton: boolean;
  setToggleButton: Dispatch<SetStateAction<boolean>>;
}

const ToggleButton = (props: ToogleButtonProps) => {
  const { toggleButton, setToggleButton } = props;

  const handleClickToggle = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <Container>
      <Button
        className={toggleButton ? 'calendar-button active' : 'calendar-button'}
        onClick={handleClickToggle}
        disabled={toggleButton}
      >
        {CALENDAR_TEXTS.calendar}
      </Button>
      <Button
        className={toggleButton ? 'list-button' : 'list-button active'}
        onClick={handleClickToggle}
        disabled={!toggleButton}
      >
        {CALENDAR_TEXTS.list}
      </Button>
    </Container>
  );
};

export default ToggleButton;

const Container = styled.div`
  display: flex;
  position: absolute;
  right: 70px;
`;

const Button = styled.button`
  height: 30px;
  border: none;
  outline: none;
  border: 1px solid ${props => props.theme.gray};
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.gray};
  cursor: pointer;

  &.calendar-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  &.list-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &.active {
    border: 2px solid ${props => props.theme.primary};
    background-color: rgba(37, 64, 135, 0.3);
    color: ${props => props.theme.primary};
  }
`;
