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
import { RootState } from '../../../common/store/RootStore';
import { useSelector } from 'react-redux';

interface Member {
  memberId: number;
  email: string;
  displayName: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

function MypageProfile() {
  const member: Member = {
    memberId: 27,
    email: 'keumhe0110@gmail.com',
    displayName: '민트',
    address: null,
    latitude: null,
    longitude: null,
  };
  const iconProps = { itemCount: 0 };
  const [user, setUser] = useState<Member | null>(null);
  const { memberId, email, displayName, address, latitude, longitude } = member;

  const getUserInfo = useCallback(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('토큰이 있습니다.', token);
    if (!token) {
      // 토큰이 없는 경우 처리
      console.log('토큰이 없습니다.', token);
      return;
    }
    if (!user) {
      return <div>로그인 정보 왜 안떠?!!</div>;
    }
  }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/members`,
  //       { headers: headers },
  //     );
  //     setUser(response.data);
  //     console.log(response);
  //     setUser(response.data);
  //     console.log(user);
  //   } catch (error) {
  //     console.error('유저 정보를 가져오는데 실패했습니다.', error);
  //     console.error('Error:', (error as Error).message);
  //   }
  // };

  // fetchUserData();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //   }
  // }, [user]);

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
            <span>{displayName}</span>
          </div>
          <Location>
            <span>
              <FaMapMarkerAlt />
            </span>
            {/**유저위치입력 */}
            <span>주소내놔{address}</span>
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
