import { Container, TopButton } from '../../pages/Main/style';

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollToTopButton() {
  return (
    <Container>
      <TopButton onClick={scrollToTop} id="top" type="button">
        Top
      </TopButton>
    </Container>
  );
}

export default scrollToTopButton;
