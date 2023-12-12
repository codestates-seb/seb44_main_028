import { useEffect } from 'react';

function useScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);
}

export default useScrollToTop;
