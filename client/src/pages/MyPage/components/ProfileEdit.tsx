import React, { useRef, useState, useCallback, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setName } from '../store/ProfileSlice';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { DefaultBtn } from '../../../common/components/Button';

function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayName = useSelector(
    (state: RootState) => state.mypageProfileSlice.name,
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [userData, setUserData] = useState({});
  useEffect(() => {
    //회원 정보 조회 Read
    updateUserInfo();
  });

  const updateUserInfo = useCallback(async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/members`,
      );
      const userInfo = response.data;
      setNickname(userInfo.displayName);
      console.log('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.log('회원 정보가 업데이트 되지 않았습니다.', error);
    }
  }, []);

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('file', e.target.files[0]);

      // 서버 연결 시
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/members`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error('이미지 업로드 중에 오류발생', error);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const onInputButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onSubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      // console.log('Form data:', Object.fromEntries(formData));
      // console.log('Form submitted!');
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            displayName: nickname,
          },
        );
        console.log('회원 정보가 성공적으로 수정되었습니다.:', response.data);
        dispatch(setName(nickname));
        navigate('/mypage');
      } catch (error) {
        console.error('회원 정보 수정 중에 오류가 발생했습니다.', error);
      }
    },
    [nickname, dispatch, navigate],
  );

  const onDeleteUser = useCallback(async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/members`,
      );
      console.log('User deleted successfully');
      console.log(response.data);
    } catch (error) {
      console.error('delete error:', error);
    }
  }, []);

  return (
    <MyPageEdit>
      <ProfileEditWrapper>
        <ProfileSection>
          <ProfileImg>
            {previewImage ? (
              <img src={previewImage} alt="Profile Image" />
            ) : (
              <img src={profileImage} alt="Profile Image" />
            )}
          </ProfileImg>
          <ProfilerEdit>
            <input
              ref={inputRef}
              type="file"
              id="imgUpload"
              name="file"
              accept="image/*"
              onChange={onUploadImage}
            />
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
            <TownBtn>내 동네 설정</TownBtn>
          </InputWrapper>
        </TextWrapper>
      </ProfileEditWrapper>
      <DelBtn>탈퇴 하기</DelBtn>
      <StyledForm onSubmit={onSubmitForm}>
        <DefaultBtn
          color={colorPalette.grayTextColor}
          backgroundColor={colorPalette.modalCancelButtonColor}
        >
          돌아가기
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.whiteColor}
          backgroundColor={colorPalette.heavyColor}
        >
          수정
        </DefaultBtn>
      </StyledForm>
    </MyPageEdit>
  );
}
export default ProfileEdit;
