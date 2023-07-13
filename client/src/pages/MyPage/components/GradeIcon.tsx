import React from 'react';

import profileImage2 from '../../../asset/my_page/3등 아이콘.svg';
import profileImage3 from '../../../asset/my_page/2등 아이콘.svg';
import profileImage4 from '../../../asset/my_page/1등 아이콘.svg';
import profileImage5 from '../../../asset/my_page/따봉아이콘.svg';
import profileImage6 from '../../../asset/my_page/메달무더기 아이콘.svg';
interface ItemIconsProps {
  itemCount: number;
}
function GradeIcon({ itemCount }: ItemIconsProps) {
  let icon = null;
  let score = null;

  if (itemCount >= 20) {
    icon = <img src={profileImage6} alt="Icon 5" />;
    score = '여행의 신';
  } else if (itemCount >= 15) {
    icon = <img src={profileImage5} alt="Icon 4" />;
    score = '플레이팩 전설';
  } else if (itemCount >= 10) {
    icon = <img src={profileImage4} alt="Icon 3" />;
    score = '렌탈의 영웅';
  } else if (itemCount >= 5) {
    icon = <img src={profileImage3} alt="Icon 2" />;
    score = '장비 콜렉터';
  } else {
    icon = <img src={profileImage2} alt="Icon 1" />;
    score = '플레이팩 초심자';
  }

  return (
    <>
      <div>{icon}</div>
      {score && <div>{score}</div>}
    </>
  );
}

export default GradeIcon;
