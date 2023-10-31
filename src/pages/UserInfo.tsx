import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { hospitalDecode } from '@/utils/decode';
import { LoginBody, UserData } from '@/lib/types';
import { PWValidation, nameValidation, phoneValidation } from '@/lib/Validation';
import { UserDataState } from '@/states/stateUserdata';
import { useRecoilState } from 'recoil';
import { login, editMyPage } from '@/lib/api';
import { FiAlertCircle } from 'react-icons/fi';
import { ProfileBody, Password, DeptDecode } from '@/lib/types';
import { USER_INFO_TEXTS } from '@/constants/userInfo';
import Loading from '@/components/Loading';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

const UserInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileBody, LoginBody>({ mode: 'onChange' });

  const { VITE_BASE_URL } = import.meta.env;

  const [user] = useRecoilState<UserData>(UserDataState);

  const [passwordChecked, setPasswordChecked] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState(`${VITE_BASE_URL}${user.profileImageUrl}`);
  const [isLoading, setIsLoading] = useState(false);

  const userImg = watch('originImage');

  useEffect(() => {
    if (userImg && userImg.length > 0) {
      const file = userImg[0];
      if (typeof file !== 'string') {
        setImgPreview(URL.createObjectURL(file));
      } else {
        console.error(USER_INFO_TEXTS.errors.profileImg);
      }
    }
  }, [userImg]);

  // 비밀번호 재확인
  const checkPassword = async (password: Password) => {
    const body = {
      email: user.email,
      password: password.password,
    };

    try {
      setIsLoading(true);
      const res = await login(body);
      if (res?.status === 200) {
        setPasswordChecked(!passwordChecked);
      }
    } catch (error) {
      console.error(USER_INFO_TEXTS.errors.failCheckPW, error);
    } finally {
      setIsLoading(false);
    }
  };

  // 개인정보 수정
  const editUserInfo = async ({ name = user.name, deptName, phone = user.phone, originImage }: ProfileBody) => {
    // 과 ID 찾기
    const findKeyByValue = (obj: DeptDecode, value: string) => {
      for (const key in obj) {
        if (obj[key] === value) {
          return Number(key);
        }
      }
      return 0;
    };
    const deptId = findKeyByValue(hospitalDecode[user.hospitalId].dept, deptName);

    // 이미지 변환
    const photoBase64Handler = async (img: File): Promise<string | void> => {
      const file = img;
      const reader = new FileReader();

      if (file.size < 1024 ** 2) {
        const base64Promise: Promise<string | void> = new Promise(resolve => {
          reader.onload = () => {
            const base64Data = reader.result?.toString().split(',')[1]; // 쉼표 뒷부분은 데이터 부분
            resolve(base64Data); // 이미지를 base64로 인코딩한 결과를 resolve
          };
        });

        reader.readAsDataURL(file);
        return await base64Promise;
      } else return alert(USER_INFO_TEXTS.errors.profileImgFileSize);
    };

    const image = await photoBase64Handler(originImage[0]);

    const body = {
      name,
      deptId,
      phone,
      image,
    };

    //* 모달 연결 후 텍스트 상수화 진행하기
    if (confirm('개인정보를 수정하시겠습니까?')) {
      try {
        setIsLoading(true);
        const res = await editMyPage(body);
        if (res.success) {
          alert('개인정보 수정이 완료되었습니다.');
          location.reload();
        }
      } catch (error) {
        console.error('개인정보 수정 실패', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {!passwordChecked ? (
        <PWCheckContainer>
          {isLoading && <Loading />}
          <Title>
            <h2>{USER_INFO_TEXTS.title.password}</h2>
          </Title>
          <p>{USER_INFO_TEXTS.description}</p>
          <PWCheckFormWrapper onSubmit={handleSubmit(checkPassword)}>
            <PwCheckLabel>
              <div className="error">
                {errors?.password && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.password.message}</div>
                  </InfoBox>
                )}
              </div>
              <Input
                type="password"
                maxLength={20}
                placeholder={USER_INFO_TEXTS.placeholder}
                {...register('password', PWValidation)}
              />
            </PwCheckLabel>
            <Btn content={USER_INFO_TEXTS.confirm} />
          </PWCheckFormWrapper>
        </PWCheckContainer>
      ) : (
        <UserInfoContainer>
          {isLoading && <Loading />}
          <Title>
            <h2>{USER_INFO_TEXTS.title.editInfo}</h2>
          </Title>
          <FormWrapper id="user-info" onSubmit={handleSubmit(editUserInfo)}>
            <ProfileImgWrapper>
              <img src={imgPreview} alt={USER_INFO_TEXTS.profileImg} />
            </ProfileImgWrapper>
            <Label className="profile">
              <ProfileImgEdit>{USER_INFO_TEXTS.editProfileImg}</ProfileImgEdit>
              <Input type="file" accept="image/*" className="profile-img" {...register('originImage')} />
            </Label>
            <Label>
              {USER_INFO_TEXTS.name}
              <Input type="text" defaultValue={user.name} {...register('name', nameValidation)} />
            </Label>
            <Label>
              {USER_INFO_TEXTS.hospital}
              <Select defaultValue={hospitalDecode[user.hospitalId].hospital}>
                <option value={hospitalDecode[user.hospitalId].hospital}>
                  {hospitalDecode[user.hospitalId].hospital}
                </option>
              </Select>
            </Label>
            <Label>
              {USER_INFO_TEXTS.dept}
              <Select
                form="user-info"
                defaultValue={hospitalDecode[user.hospitalId].dept[user.deptId]}
                {...register('deptName')}
              >
                {Object.values(hospitalDecode[user.hospitalId].dept).map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </Label>
            <Label>
              {USER_INFO_TEXTS.phone}
              <Input type="text" defaultValue={user?.phone} {...register('phone', phoneValidation)} />
            </Label>
            <EditBtnWrapper>
              <Btn content={USER_INFO_TEXTS.edit} />
            </EditBtnWrapper>
          </FormWrapper>
        </UserInfoContainer>
      )}
    </>
  );
};

export default UserInfo;

const PWCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
  p {
    font-size: 0.9rem;
  }
`;

const PWCheckFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

const PwCheckLabel = styled.label`
  justify-content: center;
  width: 320px;
  margin-bottom: 20px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  .error {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 20px;
    font-family: 'Pretendard', sans-serif;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
  gap: 16px;
  width: 500px;
  height: 700px;
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
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  &.profile-img {
    display: none;
  }
`;

const Select = styled.select`
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  /* 브라우저 기본 디자인 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 새로운 화살표 디자인 추가 */
  background: url(/arrow.png) calc(100% - 16px) center no-repeat;
  background-size: 14px;
  background-color: ${props => props.theme.white};
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileImgEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  font-family: 'Pretendard', sans-serif;
  font-size: 0.9rem;
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.8;
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
