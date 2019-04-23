import $ from 'cash-dom';

// nav scrolling for local anchor links
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault();
  hideNav();
  const href = $(this).attr('href');
  const scrollTop = Math.max($(href).offset().top - 100, 0);
  typeof history.pushState === 'function' &&
    history.pushState(null, '', location.pathname + href);
  $('html, body').prop({ scrollTop });
});

// add box-shadow to nav bar
const body = $('body');
window.addEventListener('scroll', () => {
  body[window.scrollY > 0 ? 'addClass' : 'removeClass']('scrolled');
});

// toggle nav bar
function hideNav() {
  $('.nav').removeClass('expanded');
}

$('.nav-toggle').on('click', () => $('.nav').toggleClass('expanded'));
