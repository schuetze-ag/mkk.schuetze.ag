import $ from 'jquery';
import 'bootstrap/js/src/modal.js';
import './styles/styles.scss';

window.jQuery = $;

$(() => {
  require('jquery-countto');
  require('waypoints/lib/jquery.waypoints.js');

  // animate numbers
  const facts = $('#facts');
  const counters = facts.find('.js-counter');
  counters.text('0');

  facts.waypoint({
    handler: function(direction) {
      if (direction === 'down' && !facts.hasClass('animated')) {
        console.log('starting facts animation');
        facts.addClass('animated');
        counters.countTo({
          formatter: value =>
            value.toLocaleString('de-DE', { maximumFractionDigits: 0 }),
        });
      }
    },
    offset: '80%',
  });

  // smooth scrolling for local anchor links
  $('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const scrollTop = Math.max($(href).offset().top - 100, 0);
    typeof history.pushState === 'function' &&
      history.pushState(null, '', location.pathname + href);
    $('html, body').animate({ scrollTop }, 500, 'swing');
  });

  // add box-shadow to nav bar
  const body = $('body');
  window.addEventListener('scroll', () => {
    body[window.scrollY > 0 ? 'addClass' : 'removeClass']('scrolled');
  });
});
