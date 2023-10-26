import { useForm } from 'react-hook-form';
import { PWValidation } from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { editPassword, logout } from '@/lib/api';
import { useNavigate } from 'react-router';
import { FiAlertCircle } from 'react-icons/fi';
import { EditPasswordForm } from '@/lib/types';

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
    await editPassword(body)
      .then(res => {
        if (res.success) {
          alert('비밀번호 변경이 완료되었습니다.\n다시 로그인하여 주시기 바랍니다.');
          logout();
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      })
      .catch(error => console.error('비밀번호 변경 실패', error));
  };

  return (
    <Container>
      <Title>
        <h2>비밀번호 수정</h2>
      </Title>
      <FormWrapper onSubmit={handleSubmit(editUserPassword)}>
        <Label>
          Password
          {errors?.oldPassword && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.oldPassword.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            maxLength={20}
            placeholder="현재 비밀번호를 입력해 주세요."
            {...register('oldPassword', PWValidation)}
          />
        </Label>
        <Label>
          New Password
          {errors?.newPassword && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.newPassword.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            maxLength={20}
            placeholder="8자 이상의 새 비밀번호를 입력해 주세요."
            {...register('newPassword', {
              required: '새 비밀번호 입력은 필수 입력입니다.',
              validate: {
                value: (pw: string | undefined) => {
                  if (watch('oldPassword') === pw) return '이전에 사용했던 비밀번호 입니다.';
                },
              },
            })}
          />
        </Label>
        <Label>
          New Password Check
          {errors?.pwCheck && (
            <InfoBox>
              <FiAlertCircle />
              <div className="info-text">{errors.pwCheck.message}</div>
            </InfoBox>
          )}
          <Input
            type="password"
            placeholder="새 비밀번호를 다시 입력해 주세요."
            {...register('pwCheck', {
              required: '비밀번호 확인은 필수 입력입니다.',
              validate: {
                value: (pw: string | undefined) => {
                  if (watch('newPassword') !== pw) return '비밀번호가 일치하지 않습니다.';
                },
              },
            })}
          />
        </Label>
        <EditBtnWrapper>
          <Btn content="수정하기" />
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
  /* border: 1px solid red; */
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
<InfoBox>
  <FiAlertCircle />
  <div className="info-text"></div>
</InfoBox>;
