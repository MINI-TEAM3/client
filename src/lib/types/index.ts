import { ICellRendererParams } from 'ag-grid-community';

// 프로젝트에 사용되는 types 정리 //

// 사용자 데이터
export interface UserData {
  id: number;
  empNo: number;
  name: string;
  email: string;
  phone: string;
  hospitalId: number;
  deptId: number;
  level: string;
  auth: string;
  status: string;
  annual: number;
  duty: number;
  profileImageUrl: string;
  hiredate: string;
  createdAt: string;
  updatedAt: string;
}

// 로그인
export interface LoginBody {
  email: string;
  password: string;
}

// 회원가입 (API)
export interface SignUpBody {
  email: string;
  password: string;
  phone: string;
  name: string;
  hospitalId: number;
  deptId: number;
}

// 회원가입 (Component)
export interface SignUpForm {
  email: string;
  password: string;
  pwCheck: string;
  name: string;
  hospital: string;
  dept: string;
  phone: string;
}

export interface Hospital {
  hospitalName: string;
  hospitalId: number;
}

export interface Department {
  deptName: string;
  deptId: number;
}

// 요청 내역 확인
export interface Request {
  id: number;
  user_id: number;
  hospital_id: number;
  category: string;
  startDate: string;
  endDate: string;
  evaluation: string;
  createdAt: string;
  updated_at: string;
}

// 비밀번호 변경 (API)
export interface EditPasswordBody {
  newPassword: string;
  oldPassword: string;
}

// 비밀번호 변경 (Component)
export interface EditPasswordForm {
  oldPassword: string;
  newPassword: string;
  pwCheck: string;
}

// 개인정보 수정
export interface ProfileBody {
  name: string;
  password: string;
  deptName: string;
  phone: string;
  originImage: FileList;
}

export interface Password {
  password: string;
}

// 마이페이지 수정
export interface EditMyPageBody {
  name: string;
  deptId: number;
  phone: string;
  image: string | null | unknown;
}

// 연차 등록
export interface CreateAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

// 연차 내용 수정
export interface EditAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

// 연차 신청 취소
export interface CancelAnnualBody {
  id: number;
}

// 당직 등록
export interface CreateDutyBody {
  startDate: Date;
}

// 당직 내용 수정
export interface EditDutyBody {
  startDate: Date;
  updateDate: Date;
}

// 캘린더 조회
export interface Schedule {
  category: string;
  deptName: string;
  endDate: string;
  evaluation: string;
  hospitalName: string;
  id: number;
  level: string;
  name: string;
  startDate: string;
}

// 날짜별 휴가 조회
export interface AnnualData {
  deptName: string;
  id: number;
  level: string;
  phone: string;
  username: string;
}

// 날짜별 당직 조회
export interface DutyData {
  deptName: string;
  email: string;
  id: number;
  level: string;
  phone: string;
  profileImageUrl: string;
  userId: number;
  username: string;
}

// 모달
export interface ProfileProps {
  $imgurl: null | string;
}

export interface DataBody {
  id: number;
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface ModalBtnProps {
  handler: () => void;
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
}

// 사이드바
export interface MenuItemProps {
  to: string;
  onClick?: () => void;
  isactive?: string;
}

export interface SubMenuProps {
  open?: boolean;
}

export interface ProgressProps {
  $percent: number;
}

// 대시보드
export interface DashBoardProps {
  data: DashBoardData;
}

export interface DashBoardData {
  dayWork: string;
  weekWork: string;
  monthWork: string;
}

// Decode
export interface HospitalDecode {
  hospital: string;
  dept: DeptDecode;
}

export interface HospitalListDecode {
  [key: number]: HospitalDecode;
}

export interface DeptDecode {
  [key: number]: string;
}

export interface DeptNameDecode {
  [key: number]: string;
}

// Alert
export interface AlertState {
  isOpen: boolean;
  content: JSX.Element | string;
  type: string;
}

// Table
// 근무관리 목록
export interface AttendanceList {
  startTime: string;
  endTime: string;
  workTime: string;
}

// ag grid 셀 스타일
export interface cellStyleType {
  textAlign: string;
  display: string;
  alignItems: string;
  justifyContent: string;
}

// ag grid 컬럼
export interface ColumnData {
  headerName: string;
  field: string;
  flex: number;
  cellStyle?: cellStyleType;
  cellRenderer?: (params: ICellRendererParams) => React.ReactNode;
  filter?: boolean;
}

// ag grid 컴포넌트
export interface GridTableProps {
  rowData: AttendanceList[];
  columnsData: ColumnData[];
}
