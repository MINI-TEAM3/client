import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { alertState } from '@/states/stateAlert';
import { getHospitalList, getDeptList, signUp } from '@/lib/api';
import {
  emailValidation,
  PWValidation,
  nameValidation,
  phoneValidation,
  hospitalValidation,
  deptValidation,
} from '@/lib/Validation';
import { FiAlertCircle } from 'react-icons/fi';
import { SignUpForm, Hospital, Department, AlertState } from '@/lib/types';
import { SIGN_UP_TEXTS } from '@/constants/signup';
import backgroundLogo from '/backgroundlogo.png';
import logowhithtext from '/logowithtext.png';
import Btn from '@/components/Buttons/Btn';
import Alert from '@/components/Alert';
import styled from 'styled-components';

const SignUp = () => {
  const [hospitalList, setHospitalList] = useState<string[]>([]);
  const [hospitalInfo, setHospitalInfo] = useState<Hospital[]>([]);
  const [hospitalDeptList, setHospitalDeptList] = useState<string[]>([]);
  const [hospitalDeptInfo, setHospitalDeptInfo] = useState<Department[]>([]);

  const [, setAlert] = useRecoilState<AlertState>(alertState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  // 등록된 병원 리스트 확인 (Select Box)
  const getHospital = async () => {
    try {
      const res = await getHospitalList();
      if (res.success) {
        setHospitalInfo(res.item);
        const hospitalNames = res.item.map((v: { hospitalName: string }) => v.hospitalName);
        setHospitalList(hospitalNames);
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `병원 리스트 조회 실패\n${error}`,
        type: 'error',
      });
    }
  };

  // 선택한 병원의 과 확인 (Select Box)
  const getHospitalDeptList = async (hospitalName: string) => {
    const hospitalId: number = hospitalList.indexOf(hospitalName) + 1;
    if (hospitalId) {
      try {
        const res = await getDeptList(hospitalId);
        if (res.success) {
          setHospitalDeptInfo(Object.values(res.item));
          const deptList: string[] = Object.values(
            res.item.map((v: { deptName: string }) => v.deptName).sort((a: number, b: number) => (a < b ? -1 : 1)),
          );
          setHospitalDeptList(deptList);
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `병원 과 리스트 조회 실패\n${error}`,
          type: 'error',
        });
      }
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  // 회원가입 핸들러
  const userSignUp = async ({ email, password, name, hospital, dept, phone }: SignUpForm) => {
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
      console.error();
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

    try {
      const res = await signUp(body);
      if (res.success) {
        if (confirm('회원가입 성공!\n로그인 페이지로 이동하시겠습니까?')) {
          navigate('/login');
        }
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `회원가입 실패\n${error}`,
        type: 'error',
      });
    }
  };

  return (
    <Container>
      <Alert />
      <ImgContainer1 />
      <TextWrap>
        <span>{SIGN_UP_TEXTS.title}</span>
      </TextWrap>
      <ImgContainer2 />

      <SignUpFormContainer onSubmit={handleSubmit(userSignUp)}>
        <Title>
          <h2>{SIGN_UP_TEXTS.signup}</h2>
        </Title>
        <InfoContainer>
          <InfoWrapper>
            <span>{SIGN_UP_TEXTS.accountInfo}</span>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.email}
                {errors?.email && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.email.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="email"
                placeholder={SIGN_UP_TEXTS.placeholder.email}
                {...register('email', emailValidation)}
              />
            </Label>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.password}
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
                placeholder={SIGN_UP_TEXTS.placeholder.password}
                {...register('password', PWValidation)}
              />
            </Label>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.checkPW}
                {errors?.pwCheck && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.pwCheck.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="password"
                placeholder={SIGN_UP_TEXTS.placeholder.checkPW}
                {...register('pwCheck', {
                  required: SIGN_UP_TEXTS.validation.required,
                  validate: {
                    value: (pw: string | undefined) => {
                      if (watch('password') !== pw) return SIGN_UP_TEXTS.validation.message;
                    },
                  },
                })}
              />
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <span>{SIGN_UP_TEXTS.userInfo}</span>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.name}
                {errors?.name && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.name.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="text"
                placeholder={SIGN_UP_TEXTS.placeholder.name}
                maxLength={10}
                {...register('name', nameValidation)}
              />
            </Label>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.hospital}
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
                  {SIGN_UP_TEXTS.placeholder.hospital}
                </option>
                {hospitalList.map((hospital, i) => (
                  <option key={i} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </Label>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.dept}
                {errors?.dept && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.dept.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <select required defaultValue="default" {...register('dept', deptValidation)}>
                <option value="default" disabled hidden>
                  {SIGN_UP_TEXTS.placeholder.dept}
                </option>
                {hospitalDeptList ? (
                  hospitalDeptList.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </Label>
            <Label>
              <ErrorBox>
                {SIGN_UP_TEXTS.phone}
                {errors?.phone && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.phone.message}</div>
                  </InfoBox>
                )}
              </ErrorBox>
              <Input
                type="text"
                placeholder={SIGN_UP_TEXTS.placeholder.phone}
                maxLength={11}
                {...register('phone', phoneValidation)}
              />
            </Label>
          </InfoWrapper>
        </InfoContainer>
        <Btn content={SIGN_UP_TEXTS.signup} />

        <AlreadyAccount>
          <span>{SIGN_UP_TEXTS.yesAccount}</span>
          <span
            onClick={() => {
              navigate('/login');
            }}
            className="login"
          >
            {SIGN_UP_TEXTS.login}
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
  white-space: pre-wrap;
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
