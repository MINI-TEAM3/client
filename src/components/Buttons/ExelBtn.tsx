import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { hospitalDecode, getLevel } from '@/utils/decode';
import { getDataCategory } from '@/utils/getDataCategory';
import { useRecoilValue } from 'recoil';
import { UserDataState } from '@/states/stateUserdata';
import { Schedule } from '@/lib/types';
import { BUTTON_TEXTS } from '@/constants/buttons';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ExelBtn = ({ data }: { data: Schedule[] }) => {
  const UserData = useRecoilValue(UserDataState);
  const hospitalNum = UserData.hospitalId;
  const hospitalName = hospitalDecode[hospitalNum].hospital.replace(/ /g, '');

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = `${hospitalName}_전체_휴가/당직표_${dayjs().format('YYYYMMDD')}`;

  const excelDownload = async () => {
    const ws = utils.aoa_to_sheet([
      [`${hospitalName}_전체_휴가/당직표_${dayjs().format('YYYYMMDD')}`],
      [``],
      [`유형`, `파트`, `이름`, `직급`, `시작날짜`, `종료날짜`],
    ]);

    data.map(item => {
      utils.sheet_add_aoa(
        ws,
        [
          [
            getDataCategory(item.category),
            item.deptName,
            item.name,
            getLevel(item.level),
            item.startDate,
            item.endDate,
          ],
        ],
        {
          origin: -1,
        },
      );
      ws['!cols'] = [{ wpx: 50 }, { wpx: 100 }, { wpx: 80 }, { wpx: 50 }, { wpx: 100 }, { wpx: 100 }];
      return false;
    });
    const wb = {
      Sheets: { data: ws },
      SheetNames: ['data'],
    };

    const excelButter = write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });

    await new Promise(resolve => setTimeout(resolve, 1000));

    saveAs(excelFile, excelFileName + excelFileExtension);
  };

  const handleClickDownload = () => {
    if (data.length > 0) {
      excelDownload();
    } else {
      alert('다운로드 할 수 있는 목록이 없습니다.');
    }
  };

  return <Container onClick={handleClickDownload}>{BUTTON_TEXTS.exel}</Container>;
};

export default ExelBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
