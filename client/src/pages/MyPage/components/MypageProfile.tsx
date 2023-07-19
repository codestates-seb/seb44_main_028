import React, { useEffect, useState, useCallback } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import {
  MypageProfileWrapper,
  MypageImage,
  MypageInfo,
  EvaluationItem,
  MypageRight,
  MypageLeft,
  EvaluationScore,
  Location,
} from '../style';
import ProfileImage0 from '../../../asset/my_page/myprofile_adobe_express.svg';
import GradeIcon from './GradeIcon';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { IUserInfo } from '../../../common/model/IUserInfo';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import LendCard from '../../../common/components/MypageCard/LendCard';
import Loading from '../../../common/components/Loading';

function MypageProfile() {
  const queryClient = useQueryClient();
  const decrypt = useDecryptToken();
  const { data: userData } = useGetMe();
  console.log('userData', userData);

  const iconProps = { itemCount: 0 };
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (userData) {
      if (userData && userData.displayName)
        setDisplayName(userData.displayName);
    }
  }, [userData]);

  const getUserInfo = useCallback(async () => {
    try {
      queryClient.invalidateQueries('me');
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN);
      let accessToken: string | null = null;
      if (encryptedAccessToken) {
        accessToken = decrypt(encryptedAccessToken);
      } else {
        return null;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setUser(response.data.user);
      setDisplayName(response.data.displayName);
      setAddress(response.data.address);
      console.log('setUser', response.data.user);
      console.log('setDisplayName', response.data.displayName);
    } catch (error) {
      console.error('회원 정보 가져오기 중에 오류가 발생했습니다.', error);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    console.log('setDisplayName', displayName);
  }, [displayName]);
  return (
    <MypageProfileWrapper>
      <MypageLeft>
        <MypageImage>
          <img src={ProfileImage0} alt="Profile Image" />
        </MypageImage>
        <MypageInfo>
          <div style={{ fontWeight: 'bold', fontSize: 20 }}>
            <span>
              <h4>{userData?.displayName}</h4>
            </span>
          </div>
          <Location>
            <span>
              <FaMapMarkerAlt />
            </span>
            {/**유저위치입력 */}
            <span>{address}</span>
          </Location>
        </MypageInfo>
      </MypageLeft>
      <MypageRight>
        <EvaluationItem>
          <GradeIcon {...iconProps} />
        </EvaluationItem>
        <EvaluationScore></EvaluationScore>
      </MypageRight>
    </MypageProfileWrapper>
  );
}

export default MypageProfile;
