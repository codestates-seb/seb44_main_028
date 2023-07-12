import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParentTap from '../components/ParentTap';
import ProfileEdit from '../components/ProfileEdit';
import MypageProfile from '../components/MypageProfile';
import { ProfileWrapper, EditWrapper, ProfileDataWrapper } from '../style';
import { ProfileDataType } from '../type';
import axios from 'axios';

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            params: { memberId: 1 },
          },
        );
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <ProfileWrapper>
        <ProfileEdit />
      </ProfileWrapper>
      <ProfileWrapper>
        <ProfileDataWrapper>
          <MypageProfile />
          {profileData && (
            <>
              <div>{profileData?.displayName}</div>
              <div>{profileData?.latitude}</div>
              <div>{profileData?.longitude}</div>
            </>
          )}
        </ProfileDataWrapper>
      </ProfileWrapper>
      <EditWrapper>
        <Link to="/edit">회원 정보 수정</Link>
      </EditWrapper>
      <ParentTap />
    </div>
  );
};

export default MyPage;
