import Loading from '@/components/Loading';
import { RequestModal } from '@/components/Modals/RequestModal';
import CheckModal from '@/components/Modals/checkModal';
import { useModal } from '@/hooks/useModal';
import { getRequest } from '@/lib/api';
import { scheduleIdState } from '@/states/stateScheduleId';
import { UserDataState } from '@/states/stateUserdata';
import { getCategory, getEvaluation } from '@/utils/decode';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

type Request = {
  id: number;
  user_id: number;
  hospital_id: number;
  category: string;
  startDate: string;
  endDate: string;
  evaluation: string;
  createdAt: string;
  updated_at: string;
};

const RequestList = () => {
  const userDataState = useRecoilValue(UserDataState);
  const userID = userDataState.id;
  const setScheduleId = useSetRecoilState(scheduleIdState);
  const [requestLists, setRequestLists] = useState<Record<string, Request>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();
  const [sortBy, setSortBy] = useState('최신순');

  useEffect(() => {
    setIsLoading(true);
    const getList = async () => {
      const res = await getRequest(userID);
      setRequestLists(res.item);
    };
    getList();
    setIsLoading(false);
  }, [userID]);

  const handleOnClickEdit = (category: string, id: number) => {
    if (category === 'ANNUAL') {
      setScheduleId(id);
      const modalData = {
        isOpen: true,
        title: '휴가 신청 수정',
        content: <RequestModal type="annualEdit" />,
      };
      openModal(modalData);
    } else {
      setScheduleId(id);
      const modalData = {
        isOpen: true,
        title: '당직 신청 수정',
        content: <RequestModal type="duty" />,
      };
      openModal(modalData);
    }
  };

  const handleOnClickCancle = (id: number) => {
    const modalData = {
      isOpen: true,
      title: '정말 취소하시겠습니까?',
      content: <CheckModal type={id} />,
    };
    openModal(modalData);
  };

  const sortedKeys = Object.keys(requestLists).reverse();

  const renderRequestItems = () => {
    return sortedKeys.map(key => (
      <DataWrap key={requestLists[key].id}>
        <div className="box1">{Number(key) + 1}</div>
        <div className="box2">{getCategory(requestLists[key].category)}</div>
        <div className="box3">{requestLists[key].createdAt.slice(0, 10)}</div>
        <div className="box4">
          {requestLists[key].startDate === requestLists[key].endDate
            ? requestLists[key].startDate
            : requestLists[key].startDate + '~' + requestLists[key].endDate}
        </div>
        <div className="box5">
          <BtnBox className={requestLists[key].evaluation}>
            <Dot />
            {getEvaluation(requestLists[key].evaluation)}
          </BtnBox>
        </div>
        <div className="box6">
          {requestLists[key].evaluation === 'STANDBY' && (
            <>
              <div onClick={() => handleOnClickEdit(requestLists[key].category, requestLists[key].id)}>[수정]</div>
              <div onClick={() => handleOnClickCancle(requestLists[key].id)}>[취소]</div>
            </>
          )}
        </div>
      </DataWrap>
    ));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header>
        <h1>요청 내역</h1>
        <Select name="filterMenu" value={sortBy} onChange={handleSortChange}>
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
        </Select>
      </Header>
      <TableContainer>
        <DataWrap className="title">
          <div className="box1">No.</div>
          <div className="box2">유형</div>
          <div className="box3">신청날짜</div>
          <div className="box4">희망날짜</div>
          <div className="box5">상태</div>
          <div className="box6">변경</div>
        </DataWrap>
        <ListWrap>
          {Object.keys(requestLists).length > 0 ? renderRequestItems() : <EmptyList>요청 내역이 없습니다.</EmptyList>}
        </ListWrap>
      </TableContainer>
    </Container>
  );
};
const Container = styled.div`
  box-sizing: border-box;
  padding: 0 70px 20px 70px;
  min-width: 700px;
  height: 100%;
`;
const Select = styled.select`
  width: 100px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;
const TableContainer = styled.div`
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
  height: 85%;
  position: relative;
`;
const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: scroll;
  height: 100%;
`;
const DataWrap = styled.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  &.title {
    border-bottom: 1px solid ${props => props.theme.gray};
    font-weight: 700;
  }
  &:last-child {
    margin-bottom: 16px;
  }
  div {
    text-align: center;
  }
  .box1 {
    flex: 0.5;
  }
  .box2 {
    flex: 2;
  }
  .box3 {
    flex: 2;
  }
  .box4 {
    flex: 3;
  }
  .box5 {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .box6 {
    flex: 2;
    display: flex;
    gap: 16px;
    justify-content: center;
    div:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;

  height: 30px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  margin: 0;

  &.STANDBY {
    background-color: ${props => props.theme.green};
  }
  &.APPROVED {
    background-color: ${props => props.theme.blue};
  }
  &.REJECTED {
    background-color: ${props => props.theme.red};
  }
  &.CANCELED {
    background-color: ${props => props.theme.middleGray};
  }
`;
const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin-right: 8px;
`;
const EmptyList = styled.div`
  color: ${props => props.theme.lightGray};
  font-size: 28px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default RequestList;
