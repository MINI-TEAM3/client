import { useModal } from '@/hooks/useModal';
import { getRequest } from '@/lib/api';
import { scheduleIdState } from '@/states/stateScheduleId';
import { UserDataState } from '@/states/stateUserdata';
import { getCategory } from '@/utils/getCategory';
import { getEvaluation } from '@/utils/getEvaluation';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RequestModal } from '@/components/Modals/RequestModal';
import { AlertState, Request } from '@/lib/types';
import { alertState } from '@/states/stateAlert';
import { REQUEST_LIST_TEXTS } from '@/constants/requestList';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import CheckModal from '@/components/Modals/checkModal';
import styled from 'styled-components';

const RequestList = () => {
  const userDataState = useRecoilValue(UserDataState);
  const setScheduleId = useSetRecoilState(scheduleIdState);
  const setAlert = useSetRecoilState<AlertState>(alertState);

  const userID = userDataState.id;

  const [requestLists, setRequestLists] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('최신순');

  const { openModal } = useModal();

  useEffect(() => {
    const getList = async () => {
      try {
        setIsLoading(true);
        const res = await getRequest(userID);
        const sortedItems = Object.values(res.item) as Request[];
        if (sortBy === REQUEST_LIST_TEXTS.latest) {
          sortedItems.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        } else if (sortBy === REQUEST_LIST_TEXTS.oldest) {
          sortedItems.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        }
        setRequestLists(sortedItems);
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `요청 내역 확인 실패\n${error}`,
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    getList();
  }, [userID, sortBy]);

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

  const sortedKeys: number[] = Object.keys(requestLists).map(str => Number(str));

  const renderRequestItems = () => {
    return sortedKeys.map(key => (
      <DataWrap key={requestLists[key].id}>
        <div className="box1">{key + 1}</div>
        <div className="box2">{getCategory(requestLists[key].category, requestLists[key].evaluation)}</div>
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
      <Alert />
      {isLoading && <Loading />}
      <Header>
        <h1>{REQUEST_LIST_TEXTS.title}</h1>
        <Select name="filterMenu" onChange={handleSortChange}>
          <option value={REQUEST_LIST_TEXTS.latest}>{REQUEST_LIST_TEXTS.latest}</option>
          <option value={REQUEST_LIST_TEXTS.oldest}>{REQUEST_LIST_TEXTS.oldest}</option>
        </Select>
      </Header>
      <TableContainer>
        <DataWrap className="title">
          <div className="box1">{REQUEST_LIST_TEXTS.number}</div>
          <div className="box2">{REQUEST_LIST_TEXTS.category}</div>
          <div className="box3">{REQUEST_LIST_TEXTS.applyDate}</div>
          <div className="box4">{REQUEST_LIST_TEXTS.preferDate}</div>
          <div className="box5">{REQUEST_LIST_TEXTS.state}</div>
          <div className="box6">{REQUEST_LIST_TEXTS.change}</div>
        </DataWrap>
        <ListWrap>
          {Object.keys(requestLists).length > 0 ? (
            renderRequestItems()
          ) : (
            <EmptyList>{REQUEST_LIST_TEXTS.noRequestList}</EmptyList>
          )}
        </ListWrap>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 70px;
  min-width: 700px;
  min-height: 90%;
`;

const Select = styled.select`
  width: 100px;
  height: 30px;
`;

const Header = styled.header`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

const TableContainer = styled.div`
  box-sizing: border-box;

  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
  height: 90%;
  position: relative;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: scroll;
  height: 100%;

  &&::-webkit-scrollbar {
    display: none;
  }
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
