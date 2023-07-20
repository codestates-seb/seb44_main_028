import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  UploadBtn,
  ProfileEditWrapper,
  ProfilerEdit,
  ProfileImg,
  ProfileSection,
  TextWrapper,
  NameWrapper,
  InputWrapper,
  TownBtn,
  InputBox,
  StyledForm,
  MyPageEdit,
  DelBtn,
} from '../style';
import axios from 'axios';
import profileImage from '../../../../src/asset/my_page/profile-image.svg';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { DefaultBtn } from '../../../common/components/Button';
import { ACCESS_TOKEN } from '../../Login/constants';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

function ProfileEdit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const decrypt = useDecryptToken();
  const [previewImage, setPreviewImage] = useState<string | null>(profileImage);
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [newDisplayName, setNewDisplayName] = useState<string>('');

  console.log('Initial newDisplayName:', newDisplayName);

  const { data: userData } = useGetMe();
  console.log('userData', userData);

  const fetchUpdatedUserInfo = useCallback(async () => {
    try {
      // queryClient.invalidateQueries('me');
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN) || '';
      const accessToken = decrypt(encryptedAccessToken);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJkaXNwbGF5TmFtZSI6IuuvvO2KuCIsImVtYWlsIjoia2V1bWhlMDExMEBnbWFpbC5jb20iLCJtZW1iZXJJZCI6MjgsInN1YiI6ImtldW1oZTAxMTBAZ21haWwuY29tIiwiaWF0IjoxNjg5NzQwOTU1LCJleHAiOjE2ODk3NDI3NTV9.0pjNsb7VIaknXE3ci2tTPCJ9FXc1fJg8lZz65vLjYAUbmAXCpWuot2DAiNQQ6eg07bGkIDAAyybSJkG-7INwqw`,
          },
        },
      );
      const updatedUserInfo = response.data;
      setNewDisplayName(updatedUserInfo.displayName);
      setPreviewImage(updatedUserInfo.profileImageUrl); //이미지 업데이트
      console.log('업데이트 유지정보:', updatedUserInfo.displayName);
    } catch (error) {
      console.error('업데이트된 유저정보를 가져오는데 실패했습니다.', error);
    }
  }, [decrypt]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    console.log('file', file);
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      setProfileImg(file);
      console.log(setProfileImg);
    }
  };

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.currentTarget.value);
    console.log('수정 할 이름 :', e.currentTarget.value);
  };

  useEffect(() => {
    console.log('수정 할 이름 :', newDisplayName);
  }, [newDisplayName]);

  const onInputButtonClick = () => {
    const input = document.getElementById('imgUpload') as HTMLInputElement;
    input.click();
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      const formData = new FormData();
      formData.append('displayName', newDisplayName);
      if (profileImg) {
        formData.append('imageFile', profileImg);
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/members`,
        formData,
        // {
        //   displayName: newDisplayName,
        //   imageFile: profileImg,
        // },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      alert('정보가 수정되었습니다.');
      console.log('회원 정보가 성공적으로 수정되었습니다.:', response.data);

      await fetchUpdatedUserInfo();
      navigate('/mypage', { state: { newDisplayName } });
    } catch (error) {
      console.error('회원 정보 수정 중에 오류가 발생했습니다.', error);
    }
  };
  console.log('이름수정', newDisplayName);
  return (
    <MyPageEdit>
      <ProfileEditWrapper>
        <ProfileSection>
          <ProfileImg>
            {previewImage ? (
              <img src={previewImage} alt="Profile Image" />
            ) : (
              <img src={profileImg?.name} alt="Profile Image" />
            )}
          </ProfileImg>
          <ProfilerEdit>
            <input
              type="file"
              id="imgUpload"
              name="file"
              accept="image/*"
              onChange={onUploadImage}
            />
            <input
              type="text"
              placeholder="닉네임"
              value={newDisplayName}
              onChange={onDisplayNameChange}
            />
          </ProfilerEdit>
          <UploadBtn onClick={onInputButtonClick}>파일 선택</UploadBtn>
        </ProfileSection>
        <TextWrapper>
          <NameWrapper>
            <div>닉네임</div>
            <div>내 동네</div>
          </NameWrapper>
          <InputWrapper>
            <InputBox>
              <input type="text" placeholder="닉네임" />
            </InputBox>
            {/* <TownBtn>내 동네 설정</TownBtn> */}
          </InputWrapper>
        </TextWrapper>
      </ProfileEditWrapper>
      <StyledForm onSubmit={onSubmitForm}>
        <DefaultBtn
          color={colorPalette.grayTextColor}
          backgroundColor={colorPalette.modalCancelButtonColor}
          onClick={() => navigate('/mypage')}
        >
          돌아가기
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.whiteColor}
          backgroundColor={colorPalette.heavyColor}
          type="submit"
        >
          수정
        </DefaultBtn>
      </StyledForm>
      <DelBtn>회원 탈퇴</DelBtn>
    </MyPageEdit>
  );
}
export default ProfileEdit;
