import styled from 'styled-components';
import { colorPalette } from '../../common/utils/enum/colorPalette';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #cecece;
`;

export const FooterBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
`;

export const FooterLogo = styled.div`
  font-size: 20px;
  color: ${colorPalette.deepMintColor};
`;

export const FooterTextBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;
export const FooterText = styled.h6`
  color: ${colorPalette.grayTextColor};
`;
