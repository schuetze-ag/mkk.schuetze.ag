export default function createScrollHandler(onChange) {
  let ticking = false;
  let previousWindowHeight = window.innerHeight;
  let windowHeight = window.innerHeight;
  let previousScrollPosition = window.scrollY;
  let scrollPosition = window.scrollY;

  window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        if (scrollPosition !== previousScrollPosition) {
          const direction =
            scrollPosition > previousScrollPosition ? 'down' : 'up';
          onChange({ scrollPosition, windowHeight, direction });
          previousScrollPosition = scrollPosition;
        }
        ticking = false;
      });
    }
  });

  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        if (windowHeight !== previousWindowHeight) {
          onChange({ scrollPosition, windowHeight });
          previousWindowHeight = windowHeight;
        }
        ticking = false;
      });
    }
  });
}
