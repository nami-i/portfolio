// hamburger
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', function () {
  ham.classList.toggle('is-open');
  nav.classList.toggle('is-open');
});

// scroll
const scrollHeader = document.getElementById('js-header');

window.addEventListener('scroll',function(){
  const scroll = window.pageYOffset;
  if (scroll > 0) {
    scrollHeader.style.background = '#fff';
  } else {
    scrollHeader.style.background = 'transparent';
  }
});