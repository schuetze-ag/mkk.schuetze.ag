import $ from 'jquery';
import 'bootstrap/js/src/modal.js';
import './styles/styles.scss';

window.jQuery = $;

$(() => {
  require('jquery-countto');
  require('waypoints/lib/jquery.waypoints.js');

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
});
