import styled from 'styled-components';
import { colorPalette } from '../../../src/common/utils/enum/colorPalette';
import { PiStarFill } from 'react-icons/pi';
import { DefaultBtn } from '../../common/style/style';
import { BoxShadow } from '../../../src/common/utils/enum/boxShadow';

//Tap
export const SwitchBtn = styled.div``;

//ImageUpload
export const ProfileWapper = styled.div``;
export const Button = styled.button``;

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
