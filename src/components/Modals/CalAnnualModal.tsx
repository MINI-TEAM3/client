import { useEffect, useState } from 'react';
import { getAnnual } from '@/lib/api';
import { styled } from 'styled-components';
import { getLevel } from '@/utils/decode';
import { getPhone } from '@/utils/getPhone';
import { AnnualData } from '@/lib/types';
import { MODAL_TEXTS } from '@/constants/modals';

export const CalAnnualModal = ({ date }: { date: string }) => {
  const [annual, setAnnual] = useState<AnnualData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAnnual(date);
      setAnnual(data.item);
    })();
  }, []);

  return (
    <Container>
      <DateWrap>{date}</DateWrap>
      <TableContainer>
        <DataWrap>
          <div>{MODAL_TEXTS.number}</div>
          <div>{MODAL_TEXTS.name}</div>
          <div className="dept">{MODAL_TEXTS.dept}</div>
          <div>{MODAL_TEXTS.level}</div>
          <div>{MODAL_TEXTS.phone}</div>
        </DataWrap>
        {annual.map((item, index) => (
          <DataWrap key={index}>
            <div>{index + 1}</div>
            <div>{item.username}</div>
            <div className="dept">{item.deptName}</div>
            <div>{getLevel(item.level)}</div>
            <div>{getPhone(item.phone)}</div>
          </DataWrap>
        ))}
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 64px;
`;
const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const DataWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  &:first-child {
    font-weight: 900;
  }

  div {
    flex: 2;
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 3;
    }
    &.dept {
      flex: 3;
    }
  }
`;
