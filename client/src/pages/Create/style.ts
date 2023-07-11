import styled from 'styled-components';
import { border } from '../../common/utils/enum/border';
import { borderRadius } from '../../common/utils/enum/borderRadius';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { fontSize } from '../../common/utils/enum/fontSize';
export const UploadImageContainer = styled.div`
  width: 9.875rem;
  height: 7.875rem;
  border: ${border.basic};
  border-radius: ${borderRadius.basicRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colorPalette.CaemeraIconColor};
`;
export const UploadImageWrapper = styled.div`
  & svg {
    width: 2.563rem;
    height: 2.313rem;
  }
`;
export const UploadImageCountWrapper = styled.div`
  font-size: ${fontSize.NoDataText};
`;
