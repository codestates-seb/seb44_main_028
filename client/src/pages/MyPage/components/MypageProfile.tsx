import React, { useState } from 'react';
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

function MypageProfile() {
  const iconProps = { itemCount: 0 };
  const [displayName, setDisplayName] = useState<string>('');

  const handleChangeDisplayName = async () => {
    try {
      // API 요청을 통해 닉네임 변경
      const response = await axios.put(`${process.env.REACT_APP_API_URL}`, {
        displayName: displayName,
      });
      console.log('닉네임이 변경되었습니다.', response.data);
    } catch (error) {
      console.error('닉네임 변경에 실패했습니다.', error);
    }
  };

  return (
    <MypageProfileWrapper>
      <MypageLeft>
        <MypageImage>
          <img src={ProfileImage0} alt="Profile Image" />
        </MypageImage>
        <MypageInfo>
          <div style={{ fontWeight: 'bold', fontSize: 20 }}>{displayName}</div>
          <Location>
            <span>
              <FaMapMarkerAlt />
            </span>
            <span></span>
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
