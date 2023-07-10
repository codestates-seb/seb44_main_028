import { ScrollToTopButtonContainer, TopButton } from '../style/style';

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollToTopButton() {
  return (
    <ScrollToTopButtonContainer>
      <TopButton onClick={scrollToTop} id="top" type="button">
        Top
      </TopButton>
    </ScrollToTopButtonContainer>
  );
}

export default scrollToTopButton;
