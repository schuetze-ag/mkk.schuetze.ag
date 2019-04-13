import $ from 'cash-dom';
import createScrollHandler from './scroll';

function formatNumber(value) {
  return value.toLocaleString('de-DE', { maximumFractionDigits: 0 });
}

function createCounter(el) {
  const from = parseInt(el.data('from') || '0', 10);
  const to = parseInt(el.text().replace(/[\.,]/g, ''), 10);
  const speed = parseInt(el.data('speed') || '1000', 10);
  const perMs = (to - from) / speed;
  el.text(formatNumber(from));

  return {
    start: () => {
      let value = from;
      let lastTick = Date.now();

      const onTick = () => {
        const now = Date.now();
        const elapsed = now - lastTick;
        lastTick = now;
        value = Math.min(value + elapsed * perMs, to);
        el.text(formatNumber(value));
        if (value < to) requestAnimationFrame(onTick);
      };
      onTick();
    },
  };
}

const facts = $('#facts');
const counters = facts
  .find('.js-counter')
  .map((_, e) => {
    const el = $(e);
    return createCounter(el);
  })
  .get();

createScrollHandler(({ scrollPosition, windowHeight, direction }) => {
  const { top } = facts.offset();
  const height = facts.outerHeight();
  const screenBottom = scrollPosition + windowHeight;
  const visible = screenBottom > top && scrollPosition < top + height;

  if (visible && direction === 'down' && !facts.hasClass('animated')) {
    facts.addClass('animated');
    counters.forEach(c => c.start());
  }
});
