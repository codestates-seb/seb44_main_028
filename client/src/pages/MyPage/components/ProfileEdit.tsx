import React, { useRef, useState, useCallback } from 'react';
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
// import axios from 'axios';
import profileImage from '../../../../src/asset/my_page/profile-image.svg';

function ProfileEdit() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('file', e.target.files[0]);

      // 서버 연결 시
      //     axios({
      //       baseURL: API_HOST,
      //       url: '/images/:username/thumbnail',
      //       method: 'POST',
      //       data: formData,
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //       .then((response) => {
      //         console.log(response.data);
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //       });
      //   },
      //   [],
      // );
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
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log('Form data:', Object.fromEntries(formData));
      console.log('Form submitted!');
      // 서버로 전송하는 로직을 구현합니다.
      // axios({
      //   baseURL: API_HOST,
      //   url: '/user/update',
      //   method: 'POST',
      //   data: {
      //     profileImage: previewImage,
      //     nickname: e.target.elements.nickname.value,
      //     // 추가 정보들...
      //   },
      // })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    [],
    // [previewImage],
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
          </ProfilerEdit>

          <UploadBtn onClick={onInputButtonClick}>파일 선택</UploadBtn>
        </ProfileSection>
        <TextWrapper>
          <NameWrapper>
            <ol>
              <li>닉네임</li>
              <li>내 동네</li>
            </ol>
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
        <input
          type="submit"
          value="돌아가기"
          style={{ backgroundColor: '#CDDBF0', color: '#333' }}
        />
        <input type="submit" value="정보 수정" />
      </StyledForm>
    </MyPageEdit>
  );
}
export default ProfileEdit;
