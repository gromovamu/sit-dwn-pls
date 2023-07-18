/*let clientWidth = document.documentElement.clientWidth;

function calcCountSlides(windowWidth) {
  if ( windowWidth > 1200 ) return 4;
  if ( windowWidth > 1044 ) return 3;
  if ( ( windowWidth <= 576 ) && (windowWidth > 450 ) ) return 3;
  return 2;
}

function calcSpaceBetweenSlides(windowWidth) {
  return (windowWidth > 576) ? 30 : 20 ;
}

let countSlides = calcCountSlides(clientWidth);
let spaceBetweenSlides = calcSpaceBetweenSlides(clientWidth);
*/

/* инициализация слайдера для секции hero  */
const heroSwiper = new Swiper('.hero__swiper-container', {
  slidesPerView: 1,
  loop: false,

  pagination: {
    el: '.hero__swiper-pagination',
    clickable: true,
    },

  });

  /* инициализация слайдера для секции special  */
const specialSwiper = new Swiper('.special__swiper-container', {
  slidesPerView: 'auto',
 // slidesPerGroup: 3,
  loop: false,
  spaceBetween: 32,
  // навигация
  navigation: {
    nextEl: '.special__swiper-button-next',
    prevEl: '.special__swiper-button-prev',
    },

    breakpoints: {
      // when window width is >= 280px
      280: {
        slidesPerGroup: 1,
      },
      // when window width is >= 520px
     520: {
        slidesPerGroup: 2,
      },

      // when window width is >= 900px
      900: {
        slidesPerGroup: 3,
      },
    }

  });

  /* инициализация слайдера для секции useful  */
const usefulSwiper = new Swiper('.useful__swiper-container', {
  slidesPerView: 2,
  loop: false,
  spaceBetween: 32,

  breakpoints: {
    // when window width is >= 280px
    280: {
      slidesPerView: 1,
      spaceBetween: 0
    },

    // when window width is >= 520px
    520: {
      slidesPerView: 2,
      spaceBetween: 32
    },

    // when window width is >= 900px
    900: {
      slidesPerView: 3,
      spaceBetween: 32
    },

    // when window width is >= 900px
    1200: {
      slidesPerView: 2,
      spaceBetween: 32
    },
  },

  // навигация
  navigation: {
    nextEl: '.useful__swiper-button-next',
    prevEl: '.useful__swiper-button-prev',
    },
  });

