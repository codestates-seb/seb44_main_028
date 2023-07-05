import React from 'react';
import { Container, Box, LogoBox, TextBox } from '../FooterStyles';
import { FooterType } from '../type';

function Footer({ prop1 }: FooterType) {
  // 추가적인 코드 작성
  return (
    <Container>
      <Box>
        <LogoBox>{prop1}</LogoBox>

        <Box>
          <TextBox>
            <h6>© PLAYPACK All Rights Reserved.</h6>
          </TextBox>
        </Box>
      </Box>
    </Container>
  );
}

export default Footer;
