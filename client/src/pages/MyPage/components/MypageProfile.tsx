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
function MypageProfile() {
  const iconProps = { itemCount: 0 };
  return (
    <MypageProfileWrapper>
      <MypageLeft>
        <MypageImage>
          <img src={ProfileImage0} alt="Profile Image" />
        </MypageImage>
        <MypageInfo>
          <div style={{ fontWeight: 'bold', fontSize: 20 }}>김민트</div>
          <Location>
            <span>
              <FaMapMarkerAlt />
            </span>
            <span>서초구 논현동</span>
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
