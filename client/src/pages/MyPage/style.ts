import styled from 'styled-components';
import { colorPalette } from '../../../src/common/utils/enum/colorPalette';
import { PiStarFill } from 'react-icons/pi';

//RatingStar
export const RatingStarWapper = styled.div`
  display: flex;
  text-align: center;
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
  font-size: 30px;
  margin-right: 10px;
`;
export const Index = styled.div`
  margin: 0 5px;
`;

//Modal
export const ModalWrapper = styled.div``;
export const Close = styled.div``;
