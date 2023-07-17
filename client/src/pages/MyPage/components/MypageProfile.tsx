import React, { useEffect, useState, useCallback } from 'react';
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

function MypageProfile() {
  const decrypt = useDecryptToken();
  const { data: userData } = useGetMe();
  console.log('userData', userData);

  const iconProps = { itemCount: 0 };
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const getUserInfo = useCallback(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('토큰이 있습니다.', token);
    if (!token) {
      // 토큰이 없는 경우 처리
      console.log('토큰이 없습니다.', token);
      return;
    }

    const fetchUserData = async () => {
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN);
      let accessToken: string | null = null;
      if (encryptedAccessToken) {
        accessToken = decrypt(encryptedAccessToken);
      } else {
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/`,
          { headers: headers },
        );
        setUser(response.data);
        console.log(response);
        setUser(response.data);

        if (response.data) {
          setDisplayName(response.data.displayName || '');
          setAddress(response.data.address || '');
          console.log('유저정보 ', user);
        }
      } catch (error) {
        console.error('유저 정보를 가져오는데 실패했습니다.', error);
        console.error('Error:', (error as Error).message);
      }
      fetchUserData();
    };
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

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
            <span>{userData?.address}</span>
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
