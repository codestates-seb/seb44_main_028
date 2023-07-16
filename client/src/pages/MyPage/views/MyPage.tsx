import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParentTap from '../components/ParentTap';
import MypageProfile from '../components/MypageProfile';
import { ProfileWrapper, EditWrapper, ProfileDataWrapper } from '../style';
import { ProfileDataType } from '../type';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { ACCESS_TOKEN } from '../../Login/constants';
// import BorrowCard from '../../../common/components/MypageCard/BorrowCard';
// import { BorrowCardProps } from '../../../common/type';

const MyPage = () => {
  const navigator = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
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

  const handleEditProfile = () => {
    navigator('/mypage/edit');
  };
  return (
    <div>
      <ProfileWrapper>
        <ProfileDataWrapper>
          <MypageProfile></MypageProfile>
        </ProfileDataWrapper>
      </ProfileWrapper>
      <EditWrapper onClick={handleEditProfile}>회원 정보 수정</EditWrapper>

      <ParentTap />
    </div>
  );
};

export default MyPage;
