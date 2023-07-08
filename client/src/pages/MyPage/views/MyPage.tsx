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

  return (
    <div>
      <h2>My Page</h2>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        솔직한 별점을 남겨주세요.
      </Modal>
      <ProfileWrapper>
        <ProfileEdit />
      </ProfileWrapper>
      <ParentTap />
      {/* <WishList /> */}
    </div>
  );
};

export default MyPage;
