import React from 'react';
import {
  MypageProfileWrapper,
  MypageImage,
  MypageInfo,
  EvaluationItem,
  MypageRight,
  MypageLeft,
  EvaluationScore,
} from '../style';
import profileImage from '../../../asset/my_page/profile-image.svg';
import profileImage2 from '../../../asset/my_page/profile-image.svg';
import profileImage3 from '../../../asset/my_page/profile-image.svg';
import profileImage4 from '../../../asset/my_page/3등 아이콘.svg';
import profileImage5 from '../../../asset/my_page/따봉아이콘.svg';
import profileImage6 from '../../../asset/my_page/메달무더기 아이콘.svg';
interface ItemIconsProps {
  itemCount: number;
}
const MypageProfile: React.FC<ItemIconsProps> = ({ itemCount }) => {
  const icon =
    itemCount >= 50 ? (
      <img src={profileImage6} alt="Icon 5" />
    ) : itemCount >= 40 ? (
      <img src={profileImage5} alt="Icon 4" />
    ) : itemCount >= 30 ? (
      <img src={profileImage4} alt="Icon 3" />
    ) : itemCount >= 20 ? (
      <img src={profileImage3} alt="Icon 2" />
    ) : (
      <img src={profileImage2} alt="Icon 1" />
    );

  return (
    <MypageProfileWrapper>
      <MypageLeft>
        <MypageImage>
          <img src={profileImage} />
        </MypageImage>
        <MypageInfo>
          <div>김민트</div>
          <div>서초구 논현동</div>
        </MypageInfo>
      </MypageLeft>

      <MypageRight>
        <EvaluationItem>{icon}</EvaluationItem>
        <EvaluationScore>평가 10회</EvaluationScore>
      </MypageRight>
    </MypageProfileWrapper>
  );
};

export default MypageProfile;
