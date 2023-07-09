import React from 'react';
import {
  MypageProfileWrapper,
  MypageImage,
  MypageInfo,
  EvaluationItem,
} from '../style';
import profileImage from '../../../asset/my_page/profile-image.svg';

function MypageProfile() {
  return (
    <MypageProfileWrapper>
      <MypageImage>
        <img src={profileImage} />
      </MypageImage>
      <MypageInfo>
        <div>김민트</div>
        <div>서초구 논현동</div>
      </MypageInfo>
      <EvaluationItem></EvaluationItem>
    </MypageProfileWrapper>
  );
}

export default MypageProfile;
