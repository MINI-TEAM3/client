import { useEffect, useState } from 'react';
import { getDuty } from '@/lib/api';
import { getLevel } from '@/utils/decode';
import { getPhone } from '@/utils/getPhone';
import { AlertState, DutyData, ProfileProps } from '@/lib/types';
import { MODAL_TEXTS } from '@/constants/modals';
import { useRecoilState } from 'recoil';
import { alertState } from '@/states/stateAlert';
import styled from 'styled-components';

const DutyDataInitial = {
  deptName: '',
  email: '',
  id: 0,
  level: '',
  phone: '',
  profileImageUrl: '',
  userId: 0,
  username: '',
};

export const CalDutylModal = ({ date }: { date: string }) => {
  const { VITE_BASE_URL } = import.meta.env;

  const [duty, setDuty] = useState<DutyData>(DutyDataInitial);
  const [, setAlert] = useRecoilState<AlertState>(alertState);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDuty(date);
        if (res.success) {
          setDuty(res.item);
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `당직 인원 조회 실패\n${error}`,
          type: 'error',
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <DateWrap>{date}</DateWrap>
      <UserWrap>
        {duty.profileImageUrl === null ? (
          <UserImg $imgurl="/user.png" />
        ) : (
          <UserImg $imgurl={VITE_BASE_URL + duty.profileImageUrl} />
        )}
        <UserInfo>
          <NameCard>
            <div className="name">{duty.username}</div>
            <div className="part">
              {duty.deptName} {getLevel(duty.level)}
            </div>
          </NameCard>
          <DataCard>
            <div className="dataTitle">{MODAL_TEXTS.phone}</div>
            <div className="dataText">{getPhone(duty.phone)}</div>
          </DataCard>
          <DataCard>
            <div className="dataTitle">{MODAL_TEXTS.email}</div>
            <div className="dataText">{duty.email}</div>
          </DataCard>
        </UserInfo>
      </UserWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
  margin-bottom: 40px;
`;

const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 32px;
`;

const UserWrap = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.div<ProfileProps>`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  background-image: url(${props => props.$imgurl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameCard = styled.div`
  margin-bottom: 16px;

  .name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .part {
    color: ${props => props.theme.gray};
  }
`;

const DataCard = styled.div`
  display: flex;
  margin-bottom: 4px;
  .dataTitle {
    font-weight: 700;
    margin-right: 8px;
    width: 60px;
  }
  .dataText {
  }
`;
