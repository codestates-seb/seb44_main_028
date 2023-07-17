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
import { ACCESS_TOKEN } from '../../Login/constants';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import { displayName } from 'react-quill';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const decrypt = useDecryptToken();

  const { data: userData } = useGetMe();
  console.log('userData', userData);

  const Token = (value: string | null): string | undefined => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    if (encryptedAccessToken) {
      return (value = decrypt(encryptedAccessToken));
    } else {
      return;
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [newDisplayName, setNewDisplayName] = useState('');

  useEffect(() => {
    //회원 정보 조회 Read
    updateUserInfo();
  }, []);

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };
  console.log('수정 할 이름 :', newDisplayName);

  const updateUserInfo = useCallback(async () => {
    const requestData = {
      displayName: newDisplayName,
    };
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    let accessToken: string | null = null;
    if (encryptedAccessToken) {
      accessToken = decrypt(encryptedAccessToken);
    } else {
      return;
    }
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/members`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // const accessToken: string | null = null;
      // Token(accessToken);

      console.log('회원 정보가 성공적으로 수정되었습니다.:', newDisplayName);
      //   // PATCH 요청 후 GET 요청으로 업데이트된 정보 가져오기
      const getResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const updatedUserInfo = getResponse.data;

      setNewDisplayName(updatedUserInfo.newDisplayName || '');
      // setAddress(updatedUserInfo.address || '');
      console.log('update유저정보 ', updatedUserInfo);
    } catch (error) {
      console.log('회원 정보가 업데이트 되지 않았습니다.', error);
    }
  }, [newDisplayName]);

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('file', e.target.files[0]);

      // 서버 연결 시
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/members/images/`,
          formData,
          {
            params: { memberId: 1, imageFile: formData },
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Headers': '*',
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
      const formData = new FormData(e.currentTarget);
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN);
      let accessToken: string | null = null;
      if (encryptedAccessToken) {
        accessToken = decrypt(encryptedAccessToken);
      } else {
        return;
      }

      // if (!newDisplayName) {

      console.log('Form data:', Object.fromEntries(formData));
      console.log('Form submitted!');
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            displayName: newDisplayName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}}`,
            },
          },
        );
        await updateUserInfo();
        // dispatch(setName(userData?.displayName));
        console.log('회원 정보가 성공적으로 수정되었습니다.:', response.data);
        console.log('setNewDisplayName:', setNewDisplayName);

        navigate('/mypage');
      } catch (error) {
        console.error('회원 정보 수정 중에 오류가 발생했습니다.', error);
      }
    },
    [newDisplayName, dispatch, navigate, userData, decrypt, updateUserInfo],
  );

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
            <TownBtn>내 동네 설정</TownBtn>
          </InputWrapper>
        </TextWrapper>
      </ProfileEditWrapper>
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
      <DelBtn>회원 탈퇴</DelBtn>
    </MyPageEdit>
  );
}
export default ProfileEdit;
