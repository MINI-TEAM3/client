import { useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

// interface EditProfileBody {
//   profile_image_url: string;
//   name: string;
//   hospital_id: number;
//   phone: string;
// }

const UserInfo = () => {
  const [profileImg, setProfileImg]: string | null = useState('/public/user.png');
  const imgRef = useRef();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting, isDirty, isValid },
  //   reset,
  // } = useForm<SignUpBody>({ mode: 'onChange' });

  // 프로필 사진 업로드 핸들러
  const uploadProfileImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  return (
    <Container>
      <Title>
        <h2>개인정보 수정</h2>
      </Title>
      <FormWrapper>
        <Label className="profile">
          <ProfileImgWrapper>
            <img src={profileImg ? profileImg : '/images/user.png'} alt="프로필 이미지" onClick={uploadProfileImg} />
          </ProfileImgWrapper>
          <ProfileImgEdit>변경</ProfileImgEdit>
          <Input type="file" accept="image/*" className="profile-img" />
        </Label>
        <Label>
          name
          <Input type="text" placeholder="김의사" />
        </Label>
        <Label>
          Part
          <Input type="text" placeholder="응급의학과" />
        </Label>
        <Label>
          Phone Number
          <Input type="text" placeholder="010-0000-0000" />
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
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
  height: 600px;
`;

const Label = styled.label`
  width: 340px;
  border: 1px solid red;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  &.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
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

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
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
