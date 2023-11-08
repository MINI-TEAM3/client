import { convertTime } from '@/utils/convertTime';
import { splitTimeStamp } from '@/utils/splitTimestamp';
import { ICellRendererParams } from 'ag-grid-community';
export const ATTENDANCE_TEXTS = Object.freeze({
  title: '근무 관리',
});

export const ATTENDANCE_COLUMN = [
  {
    headerName: '출근 날짜',
    field: 'startTime',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => splitTimeStamp(params.value, 'date'),
  },
  {
    headerName: '출근 시간',
    field: 'startTime',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => splitTimeStamp(params.value, 'hh:mm'),
  },
  {
    headerName: '퇴근 날짜',
    field: 'endTime',
    flex: 1,
    filter: true,
    cellRenderer: (params: ICellRendererParams) => splitTimeStamp(params.value, 'date'),
  },
  {
    headerName: '퇴근 시간',
    field: 'endTime',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => splitTimeStamp(params.value, 'hh:mm'),
  },
  {
    headerName: '금일 근로시간',
    field: 'workTime',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => convertTime(params.value),
  },
];
