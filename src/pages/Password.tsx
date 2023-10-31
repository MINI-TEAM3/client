import { useForm } from 'react-hook-form';
import { PWValidation } from '@/lib/Validation';
import { editPassword, logout } from '@/lib/api';
import { useNavigate } from 'react-router';
import { FiAlertCircle } from 'react-icons/fi';
import { EditPasswordBody, EditPasswordForm } from '@/lib/types';
import { PW_TEXTS } from '@/constants/password';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

const UserInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditPasswordForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  // 비밀번호 수정 핸들러
  const editUserPassword = async ({ oldPassword, newPassword }: EditPasswordBody) => {
    const body = {
      oldPassword,
      newPassword,
    };

    try {
      const res = await editPassword(body);
      if (res.success) {
        alert(PW_TEXTS.success);
        logout();
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패', error);
    }
  };

  return (
    <Container>
      <Title>
        <h2>{PW_TEXTS.title}</h2>
      </Title>
      <FormWrapper onSubmit={handleSubmit(editUserPassword)}>
        <Label>
          {PW_TEXTS.PW}
          {errors?.oldPassword && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.oldPassword.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            maxLength={20}
            placeholder={PW_TEXTS.placeholder.PW}
            {...register('oldPassword', PWValidation)}
          />
        </Label>
        <Label>
          {PW_TEXTS.newPW}
          {errors?.newPassword && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.newPassword.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            maxLength={20}
            placeholder={PW_TEXTS.placeholder.newPW}
            {...register('newPassword', {
              required: PW_TEXTS.validation.newPW.required,
              validate: {
                value: (pw: string | undefined) => {
                  if (watch('oldPassword') === pw) return PW_TEXTS.validation.newPW.message;
                },
              },
            })}
          />
        </Label>
        <Label>
          {PW_TEXTS.newPWCheck}
          {errors?.pwCheck && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.pwCheck.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            placeholder={PW_TEXTS.placeholder.newPWCheck}
            {...register('pwCheck', {
              required: PW_TEXTS.validation.newPWCheck.required,
              validate: {
                value: (pw: string | undefined) => {
                  if (watch('newPassword') !== pw) return PW_TEXTS.validation.newPWCheck.message;
                },
              },
            })}
          />
        </Label>
        <EditBtnWrapper>
          <Btn content={PW_TEXTS.edit} />
        </EditBtnWrapper>
      </FormWrapper>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-weight: 600;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  width: 500px;
  height: 400px;
`;

const Label = styled.label`
  width: 320px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  &.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  &.profile-img {
    display: none;
  }
`;

const EditBtnWrapper = styled.div`
  margin-top: 20px;
`;

const InfoBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  .info-text {
    margin-left: 8px;
  }
`;
