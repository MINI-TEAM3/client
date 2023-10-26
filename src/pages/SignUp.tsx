import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getHospitalList, getDeptList, signUp } from '@/lib/api';
import {
  emailValidation,
  PWValidation,
  nameValidation,
  phoneValidation,
  hospitalValidation,
  deptValidation,
} from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi';
import backgroundLogo from '/backgroundlogo.png';
import logowhithtext from '/logowithtext.png';
import { SignUpBody, SignUpForm, Hospital, Department } from '@/lib/types';

const SignUp = () => {
  const [hospitalList, setHospitalList] = useState<string[]>([]);
  const [hospitalInfo, setHospitalInfo] = useState<Hospital[]>([]); // 타입 변경
  const [hospitalDeptList, setHospitalDeptList] = useState<string[]>([]);
  const [hospitalDeptInfo, setHospitalDeptInfo] = useState<Department[]>([]); // 타입 변경

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  // 등록된 병원 리스트 확인 (Select Box)
  const getHospital = async () => {
    await getHospitalList().then(res => {
      if (res.success) {
        setHospitalInfo(res.item);
        const hospitalNames = res.item.map((v: { hospitalName: string }) => v.hospitalName);
        setHospitalList(hospitalNames);
      }
    });
  };

  // 선택한 병원의 과 확인 (Select Box)
  const getHospitalDeptList = async (hospitalName: string) => {
    const hospitalId: number = hospitalList.indexOf(hospitalName) + 1;
    if (hospitalId) {
      await getDeptList(hospitalId)
        .then(res => {
          if (res.success) {
            setHospitalDeptInfo(Object.values(res.item));
            const deptList: string[] = Object.values(
              res.item.map((v: { deptName: string }) => v.deptName).sort((a: number, b: number) => (a < b ? -1 : 1)),
            );
            setHospitalDeptList(deptList);
          }
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  // 회원가입 핸들러
  const userSignUp = async ({ email, password, name, hospital, dept, phone }: SignUpBody) => {
    let hospitalId = 0;
    let deptId = 0;

    const hospitalInfoItem = hospitalInfo.find((v: Hospital) => v.hospitalName === hospital);
    if (hospitalInfoItem) {
      hospitalId = hospitalInfoItem.hospitalId;
    }

    const deptInfoItem = hospitalDeptInfo.find((v: Department) => v.deptName === dept);
    if (deptInfoItem) {
      deptId = deptInfoItem.deptId;
    }

    if (hospitalId === 0 || deptId === 0) {
      console.error('병원 정보 불러오기 실패.');
      return;
    }
    const body = {
      email,
      password,
      name,
      hospitalId,
      deptId,
      phone,
    };
    await signUp(body)
      .then(res => {
        if (res.success) {
          if (confirm('회원가입 성공!\n로그인 페이지로 이동하시겠습니까?')) {
            navigate('/login');
          }
        }
      })
      .catch(error => console.error('회원가입 실패', error));
  };

  return (
    <Container>
      <ImgContainer1 />
      <TextWrap>
        <span>대학병원 의사들을 위한</span>
        <span>쉽고 빠른 연차 당직 관리 서비스</span>
      </TextWrap>
      <ImgContainer2 />

      <SignUpFormContainer onSubmit={handleSubmit(userSignUp)}>
        <Title>
          <h2>회원가입</h2>
        </Title>
        <InfoContainer>
          <InfoWrapper>
            <span>가입 정보</span>

            <Label>
              <ErrorBox>
                Email
                {errors?.email && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.email.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input type="email" placeholder="kim@doctor.kr" {...register('email', emailValidation)} />
            </Label>
            <Label>
              <ErrorBox>
                Password
                {errors?.password && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.password.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="password"
                maxLength={20}
                placeholder="8자 이상의 비밀번호를 입력해 주세요."
                {...register('password', PWValidation)}
              />
            </Label>
            <Label>
              <ErrorBox>
                Password Check
                {errors?.pwCheck && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.pwCheck.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해 주세요."
                {...register('pwCheck', {
                  required: '비밀번호 확인은 필수 입력입니다.',
                  validate: {
                    value: (pw: string | undefined) => {
                      if (watch('password') !== pw) return '비밀번호가 일치하지 않습니다.';
                    },
                  },
                })}
              />
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <span>유저 정보</span>
            <Label>
              <ErrorBox>
                name
                {errors?.name && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.name.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input type="text" placeholder="김의사" maxLength={10} {...register('name', nameValidation)} />
            </Label>
            <Label>
              <ErrorBox>
                Hospital
                {errors?.hospital && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.hospital.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <select
                required
                defaultValue="default"
                {...register('hospital', hospitalValidation)}
                onChange={e => getHospitalDeptList(e.target.value)}
              >
                <option value="default" disabled hidden>
                  재직 병원을 선택해 주세요.
                </option>
                {hospitalList.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Label>
            <Label>
              <ErrorBox>
                Part
                {errors?.dept && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.dept.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <select required defaultValue="default" {...register('dept', deptValidation)}>
                <option value="default" disabled hidden>
                  근무 파트를 선택해 주세요.
                </option>
                {hospitalDeptList ? (
                  hospitalDeptList.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </Label>
            <Label>
              <ErrorBox>
                Phone Number
                {errors?.phone && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.phone.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="text"
                placeholder="하이픈(-) 없이 입력하세요."
                maxLength={11}
                {...register('phone', phoneValidation)}
              />
            </Label>
          </InfoWrapper>
        </InfoContainer>
        <Btn content="회원가입" />

        <AlreadyAccount>
          <span>계정이 이미 있으신가요?</span>
          <span
            onClick={() => {
              navigate('/login');
            }}
            className="login"
          >
            로그인
          </span>
        </AlreadyAccount>
      </SignUpFormContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 60px;
`;
const ImgContainer1 = styled.div`
  width: 1050px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundLogo});
  position: absolute;
  top: unset;
  bottom: 0;
  left: 0;
`;
const ImgContainer2 = styled.div`
  width: 300px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${logowhithtext});
  position: absolute;
  top: unset;
  bottom: 580px;
  left: 100px;
`;
const TextWrap = styled.div`
  color: ${props => props.theme.white};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: unset;
  bottom: 650px;
  left: 100px;
`;

const SignUpFormContainer = styled.form`
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 900px;
  height: 100%;
  border-radius: 10px;
  margin-right: 20px;
  background-color: ${props => props.theme.white};
`;

const Title = styled.div`
  h2 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 64px;
  margin: 30px 0 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 320px;
  gap: 16px;
  span {
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  width: 256px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 20px;
`;

const AlreadyAccount = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.9rem;
  .login {
    font-weight: 700;
    color: ${props => props.theme.primary};
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;
const InfoBox = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  margin-left: 10px;
  .info-text {
    font-family: 'Pretendard', 'sans-serif';
    margin-left: 4px;
  }
`;
