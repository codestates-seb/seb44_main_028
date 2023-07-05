import React from 'react';
import { FooterWapper, Box, LogoBox, TextBox } from '../FooterStyles';
import { FooterType } from '../type';

function Footer({ prop1 }: FooterType) {
  // 추가적인 코드 작성
  return (
    <FooterWapper>
      <Box>
        <LogoBox>{prop1}</LogoBox>

        <Box>
          <TextBox>
            <h6>© PLAYPACK All Rights Reserved.</h6>
          </TextBox>
        </Box>
      </Box>
    </FooterWapper>
  );
}

export default Footer;
