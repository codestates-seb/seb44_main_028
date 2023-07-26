import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParentTap from '../components/ParentTap';
import MypageProfile from '../components/MypageProfile';
import { ProfileWrapper, EditWrapper, ProfileDataWrapper } from '../style';
import { ProfileDataType } from '../type';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';

const MyPage = () => {
  useScrollToTop();
  const decrypt = useDecryptToken();
  const navigator = useNavigate();
  const { data: userData } = useGetMe();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userInfo.isLoggedIn,
  );
  console.log('Mypage userData', userData);
  console.log('로그인 상태인가?', isLoggedIn);

  const [profileData, setProfileData] = useState<ProfileDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN) || '';
      const accessToken = decrypt(encryptedAccessToken);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
          // {
          //   headers: {
          //     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6MSwic3ViIjoiZGFkYSIsImlhdCI6MTY4OTY2MTE3NiwiZXhwIjoxNjkwMjYxMTc2fQ.ri4YulVTAY7oAH_Xc-1Vm8mlFVXyMcKOf3gVAsc_SkIEE64AsI7ZVgrmF5yQpEdf1kuXhtXLO9zCUmvgnwhRQw`,
          //   },}
        );
        setProfileData(response.data);
        console.log('setProfileData:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
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

      <ParentTap lendCardData={[]} />
    </div>
  );
};

export default MyPage;
