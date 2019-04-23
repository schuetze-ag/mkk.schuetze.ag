import $ from 'cash-dom';

const cookieName = 'scag_cookies_accepted';
const property = 'UA-129209124-6';

const pageLoadedAt = new Date();

const consent = getCookieConsent();
console.log('cookie consent:', consent);

if (consent === true) {
  initializeAnalytics();
} else if (consent !== false) {
  showCookieBanner();
}

function getCookieConsent() {
  const match = document.cookie.match(/scag_cookies_accepted=(true|false)/);
  return match ? match[1] === 'true' : undefined;
}

function initializeAnalytics() {
  console.log('initialize analytics');

  const t = document.createElement('script');
  t.src = `https://www.googletagmanager.com/gtag/js?id=${property}`;
  document.getElementsByTagName('head')[0].appendChild(t);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', pageLoadedAt);
  gtag('config', property, { anonymize_ip: true });
}

function showCookieBanner() {
  const banner = $('.cookie-banner');
  banner.find('.btn-primary').on('click', acceptCookies);
  banner.find('.btn-outline-secondary').on('click', rejectCookies);
  banner.addClass('show');
}

function acceptCookies() {
  console.log('cookies accepted');
  document.cookie = `${cookieName}=true`;
  hideCookieBanner();
  initializeAnalytics();
}

function rejectCookies() {
  console.log('cookies rejected');
  document.cookie = `${cookieName}=false`;
  hideCookieBanner();
}

function hideCookieBanner() {
  $('.cookie-banner').removeClass('show');
}
