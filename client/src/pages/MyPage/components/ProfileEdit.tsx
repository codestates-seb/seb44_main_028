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
} from '../style';
import axios from 'axios';
import profileImage from '../../../../src/asset/my_page/profile-image.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setName } from '../store/ProfileSlice';

function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayName = useSelector(
    (state: RootState) => state.mypageProfileSlice.name,
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    //회원 정보 조회 Read
    getUserInfo();
  });

  const getUserInfo = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/members`)
      .then((response) => {
        const userInfo = response.data;
        setNickname(userInfo.nickname);
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.error(error);
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
      const formData = new FormData(e.currentTarget);
      console.log('Form data:', Object.fromEntries(formData));
      console.log('Form submitted!');
      navigate('/mypage');
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            profileImage: previewImage,
            nickname: nickname,
          },
        );
        console.log(response.data);
        navigate('/mypage');

        dispatch(setName(nickname));
      } catch (error) {
        console.error(error);
      }
    },

    [previewImage, dispatch],
  );

  const onDeleteUser = useCallback(async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user`,
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
      <StyledForm onSubmit={onSubmitForm}>
        <button
          value="돌아가기"
          style={{ backgroundColor: '#CDDBF0', color: '#333' }}
          onClick={onDeleteUser}
        />
        <input type="submit" value="정보 수정" />
      </StyledForm>
    </MyPageEdit>
  );
}
export default ProfileEdit;
