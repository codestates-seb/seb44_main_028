import {
  FooterWrapper,
  FooterBox,
  FooterLogo,
  FooterTextBox,
  FooterText,
} from '../FooterStyles';
import { FooterType } from '../type';

function Footer({ prop1 }: FooterType) {
  // 추가적인 코드 작성
  return (
    <FooterWrapper>
      <FooterBox>
        <FooterLogo>{prop1}</FooterLogo>
      </FooterBox>

      <FooterTextBox>
        <FooterText>© PLAYPACK All Rights Reserved.</FooterText>
      </FooterTextBox>
    </FooterWrapper>
  );
}

export default Footer;
