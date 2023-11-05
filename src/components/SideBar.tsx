import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';
import Alert from '@/components/Alert';
import { getLevel, deptName } from '@/utils/decode';
import { logout, getMyPage, scheduleOn, scheduleOff } from '@/lib/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { UserDataState } from '@/states/stateUserdata';
import { SIDE_BAR_TEXTS } from '@/constants/sideBar';
import { MenuItemProps, SubMenuProps, ProgressProps, AlertState } from '@/lib/types';
import { alertState } from '@/states/stateAlert';
import StyledButton from './Buttons/StyledButton';

const SideBar = () => {
  const [User, setUser] = useRecoilState(UserDataState);
  const setAlert = useSetRecoilState<AlertState>(alertState);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMyPageActive, setIsMyPageActive] = useState('false');

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyPage();
        if (res.success) {
          setUser(res.item);
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `마이페이지 조회 실패\n${error}`,
          type: 'error',
        });
      }
    })();
  }, []);

  //그래프 퍼센트 계산
  const percentData = (data: number, max: number) => {
    return Math.floor((data / max) * 100);
  };

  const handleClickMyPage = () => {
    setIsSubMenuOpen(true);
  };

  const handleClickMenu = () => {
    setIsSubMenuOpen(false);
    setIsMyPageActive('false');
  };

  const handleClickSubMenu = () => {
    setIsMyPageActive('true');
  };

  const handleClickLogout = async () => {
    try {
      const res = await logout();
      if (res.success) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `로그아웃 실패\n${error}`,
        type: 'error',
      });
    }
  };

  const handleClickScheduleButton = async () => {
    User.flag === 0 ? await scheduleOn() : await scheduleOff();
  };

  return (
    <Container>
      <Alert />
      <NavLink to={'/'}>
        <Logo></Logo>
      </NavLink>
      <Menu>
        <MenuItem to="/" onClick={handleClickMenu}>
          <AiOutlineClockCircle />
          <span>{SIDE_BAR_TEXTS.calendar}</span>
        </MenuItem>
        <MenuItem to="/request" onClick={handleClickMenu}>
          <FaRegPaperPlane />
          <span>{SIDE_BAR_TEXTS.request}</span>
        </MenuItem>
        <MenuItem to="/userinfo" onClick={handleClickMyPage} isactive={isMyPageActive}>
          <BsFillPersonFill />
          <span className="mypage">{SIDE_BAR_TEXTS.myPage}</span>
        </MenuItem>
      </Menu>
      <SubMenu open={isSubMenuOpen}>
        <SubMenuItem to="/userinfo" onClick={handleClickSubMenu}>
          {SIDE_BAR_TEXTS.userInfo}
        </SubMenuItem>
        <SubMenuItem to="/password" onClick={handleClickSubMenu}>
          {SIDE_BAR_TEXTS.password}
        </SubMenuItem>
        <SubMenuItem to="/attendance" onClick={handleClickSubMenu}>
          {SIDE_BAR_TEXTS.attendance}
        </SubMenuItem>
      </SubMenu>

      <Wrapper>
        <UserInfo>
          <span className="user-name">{User.name}</span>
          <span className="user-dept">{deptName[User.deptId]}</span>
          <span className="user-level">{getLevel(User.level)}</span>
        </UserInfo>
        <UserSchedule>
          <DataRow>
            <span className="label">{SIDE_BAR_TEXTS.annual}</span>
            <ProgressBar>
              <Progress className="annual" $percent={percentData(User.annual, 15)}></Progress>
            </ProgressBar>
            <span className="label-date">{User.annual}일</span>
          </DataRow>
          <DataRow>
            <span className="label">{SIDE_BAR_TEXTS.duty}</span>
            <ProgressBar>
              <Progress className="duty" $percent={percentData(User.duty, 3)}></Progress>
            </ProgressBar>
            <span className="label-date">{User.duty}일</span>
          </DataRow>
        </UserSchedule>
        {User.flag ? (
          <StyledButton onClick={handleClickScheduleButton} type="offschedule" size="big" />
        ) : (
          <StyledButton onClick={handleClickScheduleButton} type="onschedule" size="big" />
        )}

        <BtnContainer>
          <StyledButton type="annual" size="small" />
          <StyledButton type="duty" size="small" />
        </BtnContainer>
        <LogoutBtn onClick={handleClickLogout}>{SIDE_BAR_TEXTS.logout}</LogoutBtn>
        <Mark>{SIDE_BAR_TEXTS.mark}</Mark>
      </Wrapper>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const Logo = styled.div`
  margin-top: 60px;
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 160px;
  height: 35px;
  background-position: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
`;

const MenuItem = styled(NavLink)<MenuItemProps>`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    box-sizing: border-box;
    height: 24px;
  }
  &.active {
    color: ${props => props.theme.primary};
    span {
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }
  .mypage {
    border-bottom: ${props => (props.isactive == 'true' ? '2px' : '0')} solid ${props => props.theme.primary};
  }
`;

const SubMenu = styled.div<SubMenuProps>`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;

const SubMenuItem = styled(NavLink)`
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.theme.lightGray};
  &.active {
    font-weight: 700;
    color: ${props => props.theme.black};
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: baseline;
  width: 240px;
  .user-name {
    margin-right: 10px;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .user-dept,
  .user-level {
    margin-right: 5px;
    font-size: 0.75rem;
    color: ${props => props.theme.gray};
  }
`;

const UserSchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  gap: 16px;
  margin-bottom: 20px;
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .progress-wrap {
    display: flex;
    align-items: center;
  }
  .label {
    width: 80px;
  }
  .label-date {
    width: 40px;
    text-align: right;
  }
`;

const ProgressBar = styled.div`
  width: 90px;
  height: 5px;
  border-radius: 30px;
  background-color: ${props => props.theme.middleGray};
`;

const Progress = styled.div<ProgressProps>`
  width: ${props => props.$percent + '%'};
  height: 100%;
  border-radius: 30px;
  background-color: ${props => props.theme.primary};
`;

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  margin-top: 20px;
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;

const Mark = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGray};
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
`;
