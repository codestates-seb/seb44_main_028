import React, { useRef, useState, useCallback } from 'react';
import {
  UploadBtn,
  ProfileWrapper,
  ProfilerEdit,
  ProfileImg,
  ProfileSection,
  TextWrapper,
  NameWrapper,
  InputWrapper,
  TownBtn,
} from '../style';
// import axios from 'axios';
import profileImage from '../../../../src/asset/my_page/profile-image.svg';
import { text } from 'stream/consumers';

function ImageUpload() {
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
  return (
    <ProfileWrapper>
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
          <span>닉네임</span>
          <span>내 동네</span>
        </NameWrapper>
        <InputWrapper>
          <input type="text" placeholder="닉네임" />
          <TownBtn>내 동네 설정</TownBtn>
        </InputWrapper>
      </TextWrapper>
    </ProfileWrapper>
  );
}
export default ImageUpload;
