import { useRecoilValue } from 'recoil';
import { MdOutlineLocalHospital } from 'react-icons/md';
import { hospitalDecode } from '@/utils/decode';
import { UserDataState } from '@/states/stateUserdata';
import WorkTimer from './WorkTimer';
import styled from 'styled-components';

const MainHeader = () => {
  const UserData = useRecoilValue(UserDataState);
  const hospitalNum = UserData.hospitalId;

  return (
    <Container>
      <WorkTimer />
      <HosPitalName>
        <MdOutlineLocalHospital />
        {hospitalNum && <span className="hospital-name">{hospitalDecode[hospitalNum].hospital}</span>}
      </HosPitalName>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 70px;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPitalName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
