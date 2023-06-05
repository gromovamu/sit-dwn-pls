/*
  Функции для отображения блока "Похожие товары" на странице с карточкой товара.
  У нас есть блок со слайдером куда надо записать карточки.
  Блок изначально пустой карточки подгружаются с помощью js.
  данные карточек используются из файла сatalog.js  подразумевается, что он подключен перед этим файлом.
  Т.к. закономерности в показе карточек в макете я не выявила,
  для показа используется массив с заданнными номерами карточек из catalogBase.
  Также требует подключения библиотеки swiper-bundle.min.j */


  let catalogSimilarNum = [16, 11, 17, 7, 13,15]; //массив с заданнными номерами карточек из catalogBase

  // Создаем карточки на странице
  function createSimilarCards(similarNum) {
    let htmlTextCards='';

    similarNum.forEach(function (num) {
     htmlTextCards += loadCard(catalogBase[num-1]);
    });

    return htmlTextCards;
  }

  function loadSimilarCards(htmlTextCards) {
    let conatiner = document.querySelector('.similar__list');
    //console.log (conatiner);

    // добавляем элементы на страницу
    conatiner.insertAdjacentHTML('afterbegin', htmlTextCards);

    // добавляем классы swiper-slide к элементам catalog__item
    document.querySelectorAll('.catalog__item').forEach(function(elem) {
      elem.classList.add('swiper-slide');
    });
  }


  //----------------- основной код скрипта ----------------------
  loadSimilarCards(createSimilarCards(catalogSimilarNum));

  /* инициализация слайдера для секции similar  */
  const similarSwiper = new Swiper('.similar__swiper-container', {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 32,

    breakpoints: {
      // when window width is >= 280px
      280: {
        slidesPerView: 2,
        spaceBetween: 16,
      },

      // when window width is >= 760px
      760: {
        slidesPerView: 2,
        spaceBetween: 32,
      },

      // when window width is >= 900px
      900: {
        slidesPerView: 3,
      },

      // when window width is >= 900px
      1200: {
        slidesPerView: 4,
      },
    },

    // навигация
    navigation: {
      nextEl: '.similar__btn-next',
      prevEl: '.similar__btn-prev',
      },
  });

