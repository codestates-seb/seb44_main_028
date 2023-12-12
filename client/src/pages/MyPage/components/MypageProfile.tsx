import { useEffect, useState, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
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
import ProfileImage0 from '../../../asset/my_page/myprofile_adobe_express.svg';
import GradeIcon from './GradeIcon';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { IUserInfo } from '../../../common/model/IUserInfo';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import BorrowCard from '../../../common/components/MypageCard/BorrowCard';
import LendCard from '../../../common/components/MypageCard/LendCard';
import useGeoLocation from '../utils/customHooks/useGeoLocation';
import { set } from 'react-hook-form';
import { LocationProps } from '../type';
import { access } from 'fs';
import { useLocation } from 'react-router-dom';
import { addressForMatter } from '../helper/addressForMatter';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';

function MypageProfile() {
  useScrollToTop();
  const queryClient = useQueryClient();
  const decrypt = useDecryptToken();

  const iconProps = { itemCount: 0 };
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const { data: userData } = useGetMe();
  console.log('userData', userData);

  //userData 객체가 변경되면 displayName 상태를 업데이트
  useEffect(() => {
    if (userData) {
      if (userData && userData.displayName)
        setDisplayName(userData.displayName);
    }
  }, [userData]);
  const displayNameToRender = userData?.displayName || ''; // 화면에 렌더링

  const getUserInfo = useCallback(async () => {
    try {
      queryClient.invalidateQueries('me');
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN) || '';
      const accessToken = decrypt(encryptedAccessToken);

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
      console.log('setDisplayName', response.data);
    } catch (error) {
      console.error('회원 정보 가져오기 중에 오류가 발생했습니다.', error);
    }
  }, []);

  const [isGetLocationData, setIsGetLocationData] = useState<string>(
    userData?.address || '',
  );

  const encryptedAccessToken: string | null =
    localStorage.getItem(ACCESS_TOKEN) || '';
  const accessToken = decrypt(encryptedAccessToken);

  const location = useGeoLocation();
  const formData = new FormData();

  const patchUserLocation = useMutation(async () =>
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/members/location`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } },
        //
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
              <h4>{displayNameToRender}</h4>
            </span>
          </div>
          <Location>
            {isGetLocationData && (
              <LocationContent>
                <FaMapMarkerAlt />
                <div>{addressForMatter(isGetLocationData)}</div>
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
