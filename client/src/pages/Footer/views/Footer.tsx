import React from 'react';
import { Container, Box, LogoBox, TextBox } from '../FooterStyles';
import { FooterType } from '../type';

const Footer: React.FC<FooterType> = () => {
  // 추가적인 코드 작성

  return (
    <Container>
      <Box>
        <LogoBox>
          {/*<img src="" alt="Logo" />*/}
          로고
        </LogoBox>
        <TextBox>
          <p>© PLAYPACK All Rights Reserved.</p>
        </TextBox>
      </Box>
    </Container>
  );
};

export default Footer;
