import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { login } from '@/lib/api';
import { LoginBody } from '@/lib/types';
import { LOGIN_TEXTS } from '@/constants/login';
import Btn from '@/components/Buttons/Btn';
import SignUpValidation from '@/lib/Validation/validation';
import backgroundLogo from '/backgroundlogo.png';
import logowhithtext from '/logowithtext.png';
import styled from 'styled-components';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const saveTokenToLocalstorage = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  useEffect(() => {
    localStorage.getItem('authToken') && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginBody>();

  const onSubmit = async (data: LoginBody) => {
    const validationErrors = SignUpValidation(data);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        if (field === 'email' || field === 'password') {
          setError(field, { type: 'manual', message });
        }
      });
    } else {
      try {
        const response = await login({ email: data.email, password: data.password });
        if (response && response.data.success) {
          setLoginError('');
          const token = response.headers.authorization;
          saveTokenToLocalstorage(token);
          navigate('/');
        } else {
          setLoginError(LOGIN_TEXTS.errors.login);
        }
      } catch (error) {
        setLoginError(LOGIN_TEXTS.errors.login);
      }
    }
  };

  return (
    <Container>
      <ImgContainer1 />
      <TextWrap>
        <span>{LOGIN_TEXTS.title}</span>
      </TextWrap>
      <ImgContainer2 />
      <Wrap>
        <h1>{LOGIN_TEXTS.hello}</h1>
        <FormWrap onSubmit={handleSubmit(onSubmit)} name="loginForm">
          <InputContainer>
            <ErrorBox>
              <div className="inputTitle">email</div>
              {errors.email && (
                <InfoBox>
                  <FiAlertCircle />
                  <span className="info-text">{errors.email.message}</span>
                </InfoBox>
              )}
            </ErrorBox>
            <input type="email" placeholder={LOGIN_TEXTS.placehoder.email} {...register('email')} />
          </InputContainer>
          <InputContainer>
            <ErrorBox>
              <div className="inputTitle">password</div>
              {errors.password && (
                <InfoBox>
                  <FiAlertCircle />
                  <span className="info-text">{errors.password.message}</span>
                </InfoBox>
              )}
            </ErrorBox>
            <input type="password" placeholder={LOGIN_TEXTS.placehoder.password} {...register('password')} />
            <RejectLogin>
              {loginError && (
                <InfoBox>
                  <FiAlertCircle />
                  <span className="info-text">{loginError}</span>
                </InfoBox>
              )}
            </RejectLogin>
          </InputContainer>
          <InputContainer>
            <Btn content={LOGIN_TEXTS.login} />
          </InputContainer>
        </FormWrap>
        <SignUpLink>
          <span>{LOGIN_TEXTS.noAccount}</span>
          <Link to="/signup" className="linkto">
            {LOGIN_TEXTS.signup}
          </Link>
        </SignUpLink>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: right;
  align-items: center;
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

const Wrap = styled.div`
  z-index: 9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 600px;
  height: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.white};

  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 32px;
  }

  .linkto {
    font-weight: 700;
    color: ${props => props.theme.primary};
  }
`;

const FormWrap = styled.form`
  height: fit-content;
`;

const InputContainer = styled.div`
  .inputTitle {
    font-size: 14px;
    font-family: 'ABeeZee', sans-serif;
  }

  button {
    margin-top: 10px;
  }

  &:first-child {
    margin-bottom: 16px;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 20px;
  margin-bottom: 4px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  margin-left: 10px;
  .info-text {
    margin-left: 4px;
  }
`;

const SignUpLink = styled.div`
  font-size: 14px;
`;

const RejectLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 20px;
  margin: 20px 0 10px;
`;

export default Login;
