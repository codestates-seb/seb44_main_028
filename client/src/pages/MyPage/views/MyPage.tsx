import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import ParentTap from '../components/ParentTap';
import ProfileEdit from '../components/ProfileEdit';
import WishList from '../components/WishList';
import { ProfileWrapper } from '../style';
import { ProfileDataType } from '../type';

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [nowActivatedTabValue, setNowActivatedTabValue] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);

  // useEffect(() => {
  //   // 서버에서 데이터를 가져오는 API 요청을 수행합니다.
  //   fetchProfileData()
  //     .then((data) => setProfileData(data))
  //     .catch((error) => {
  //       // 에러 처리를 수행합니다.
  //       console.error('Error fetching profile data:', error);
  //     });
  // }, []);

  // const fetchProfileData = async (): Promise<ProfileDataType> => {
  //   const response = await fetch('/api/profile');
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch profile data');
  //   }
  //   const data: ProfileDataType = await response.json();
  //   return data;
  // };
  // if (!profileData) {
  //   // 데이터 로딩 중일 때 표시할 로딩 상태를 처리합니다.
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>My Page</h2>
      {/* <p>Name: {profileData.name}</p>
      <p>Age: {profileData.age}</p> */}
      <ParentTap />
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        솔직한 별점을 남겨주세요.
      </Modal>
      <ProfileWrapper>
        <ProfileEdit />
      </ProfileWrapper>
      {/* <WishList /> */}
    </div>
  );
};

export default MyPage;
