import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParentTap from '../components/ParentTap';
import MypageProfile from '../components/MypageProfile';
import { ProfileWrapper, EditWrapper, ProfileDataWrapper } from '../style';
import { ProfileDataType } from '../type';
import axios from 'axios';

const MyPage = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
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
        <ProfileDataWrapper>
          <MypageProfile></MypageProfile>
        </ProfileDataWrapper>
      </ProfileWrapper>
      <EditWrapper>
        <Link to="/mypage/edit">회원 정보 수정</Link>
      </EditWrapper>
      <ParentTap />
    </div>
  );
};

export default MyPage;
