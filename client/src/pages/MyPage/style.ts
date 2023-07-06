import styled from 'styled-components';
import { colorPalette } from '../../../src/common/utils/enum/colorPalette';
import { PiStarFill } from 'react-icons/pi';
import { DefaultBtn } from '../../common/style/style';
import { BoxShadow } from '../../../src/common/utils/enum/boxShadow';

//Tap
export const SwitchBtn = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colorPalette.borderColor};
  z-index: 1;
`;
export const CustomTapButton = styled.button`
  padding: 12px 24px;
  background-color: ${colorPalette.whiteColor};
  color: ${colorPalette.basicTextColor};
  font-size: 12px;
  font-weight: bold;
  border: none;

  line-height: 1.5;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  z-index: 5;

  &:hover {
    color: ${colorPalette.deepMintColor};
    border-bottom: 1px solid ${colorPalette.deepMintColor};
  }

  &:disabled {
    opacity: 0.5; /* 비활성화 시 투명도 조정 */
    cursor: not-allowed;
  }
  &:active {
    color: ${colorPalette.deepMintColor};
    border-bottom: 1px solid ${colorPalette.deepMintColor};
  }
  &:focus {
    color: ${colorPalette.deepMintColor};
    border-bottom: 1px solid ${colorPalette.deepMintColor};
  }
`;

//ImageUpload
export const ProfileWrapper = styled.div`
  display: flex;
`;
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const UploadBtn = styled.button`
  font-size: 12px;
  width: 80px;
  height: 32px;
  background-color: ${colorPalette.whiteColor};
  border-radius: 3px;
  border: 1px solid ${colorPalette.grayTextColor};
`;
export const ProfilerEdit = styled.div`
  display: none;
`;
export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const NameWrapper = styled.div`
  margin: 40px;
`;
export const InputWrapper = styled.div`
  input {
    width: 200px;
    height: 25px;
    padding-left: 10px;
  }
`;

export const TownBtn = styled(DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  width: 80px;
  height: 22px;
`;
export const ProfileImg = styled.div`
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

//RatingStar
export const RatingStarWapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0px;
  .inactive {
    color: ${colorPalette.grayColor};
  }
  .active {
    color: ${colorPalette.accentColor};
  }
`;

export const RatingStarBox = styled(PiStarFill)`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 2px;
  margin-top: -10px;
`;
export const Index = styled.div`
  margin: 0 5px;
  font-size: 12px;
`;

//Modal
export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  height: 180px;
  width: 316px;
  padding-top: 2rem;
  box-shadow: ${BoxShadow.Basic};
`;

export const ButtonWapper = styled.div`
  justify-content: space-around;
  padding: 10px 40px;
`;
export const ButtonWapper2 = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 1rem; /* 원하는 여백 설정 */
`;

export const Close = styled(DefaultBtn)`
  justify-content: space-around;
  border-radius: 5px;
  color: ${colorPalette.basicTextColor};
  background-color: ${colorPalette.modalCancelButtonColor};
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colorPalette.modalCancelButtonColor};
  }
`;
export const Rating = styled(DefaultBtn)``;
