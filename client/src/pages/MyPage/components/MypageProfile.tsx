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
  TownBtn,
  LocationContent,
} from '../style';
import Loading from '../../../common/components/Loading';
import ProfileImage0 from '../../../asset/my_page/myprofile_adobe_express.svg';
import GradeIcon from './GradeIcon';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { IUserInfo } from '../../../common/model/IUserInfo';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import LendCard from '../../../common/components/MypageCard/LendCard';
import useGeoLocation from '../utils/customHooks/useGeoLocation';
import { set } from 'react-hook-form';
import { LocationProps } from '../type';
import { useMutation, useQuery } from 'react-query';
import { access } from 'fs';

function MypageProfile() {
  const iconProps = { itemCount: 0 };
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const { data: userData } = useGetMe();

  const decrypt = useDecryptToken();
  const getUserInfo = useCallback(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('토큰이 있습니다.', token);
    if (!token) {
      // 토큰이 없는 경우 처리
      console.log('토큰이 없습니다.', token);
      return;
    }
    console.log('userData', userData);

    const fetchUserData = async () => {
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN);
      let accessToken: string | null = null;
      if (encryptedAccessToken) {
        accessToken = decrypt(encryptedAccessToken);
      } else {
        return null;
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

  const [isGetLocationData, setIsGetLocationData] = useState<string>(
    userData?.address || '',
  );

  const encryptedAccessToken: string | null =
    localStorage.getItem(ACCESS_TOKEN);
  let accessToken: string | null = null;
  if (encryptedAccessToken) {
    accessToken = decrypt(encryptedAccessToken);
  } else {
    return null;
  }

  const location = useGeoLocation();
  const formData = new FormData();

  const patchUserLocation = useMutation(async () =>
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/members/location`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      .then((res) => {
        console.log(res);
        setIsGetLocationData(res.data.address);
      })
      .catch((err) => {
        console.log(err);
      }),
  );

  const handleLocation = () => {
    if (location) {
      formData.append('latitude', String(location?.coordinates?.lat));
      formData.append('longitude', String(location?.coordinates?.lng));
      formData.append('memberId', String(userData?.memberId));
    }
    patchUserLocation.mutate();
  };
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
            {isGetLocationData && (
              <LocationContent>
                <FaMapMarkerAlt />
                <div>{isGetLocationData}</div>
              </LocationContent>
            )}
            <TownBtn onClick={handleLocation}>내 동네 설정</TownBtn>
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
