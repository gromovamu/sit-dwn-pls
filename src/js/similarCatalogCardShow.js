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


  // массив содержит элементы с содержимым путей к изображениям для демонстрации товара
  // т.к. структура может меняться и на данный момент у меня нет необзодимых изображений
  // т.к. они не предоставлены в макете возьму из изображений с модальными окнами
  let sourceImgData = [ {
      name: 'img0',
      source1: './img/catalog/sofas/D-31/main-img-320.png',
      source2: './img/catalog/sofas/D-31/main-img-1024.png',
      source3: './img/catalog/sofas/D-31/main-img.png',
      source4: './img/catalog/sofas/D-31/main-img-1024.png',
      src: './img/catalog/sofas/D-31/main-img.png',
    },
    {
      name: 'img1',
      source1: './img/catalog/sofas/D-31/pre-modal-img-1.png',
      source2: './img/catalog/sofas/D-31/pre-modal-img-1.png',
      source3: './img/catalog/sofas/D-31/pre-modal-img-1.png',
      source4: './img/catalog/sofas/D-31/pre-modal-img-1.png',
      src: './img/catalog/sofas/D-31/pre-modal-img-1.png',
    },
    {
      name: 'img2',
      source1: './img/catalog/sofas/D-31/pre-modal-img-2.png',
      source2: './img/catalog/sofas/D-31/pre-modal-img-2.png',
      source3: './img/catalog/sofas/D-31/pre-modal-img-2.png',
      source4: './img/catalog/sofas/D-31/pre-modal-img-2.png',
      src: './img/catalog/sofas/D-31/pre-modal-img-2.png',
    },
    {
      name: 'img2',
      source1: './img/catalog/sofas/D-31/pre-modal-img-3.png',
      source2: './img/catalog/sofas/D-31/pre-modal-img-3.png',
      source3: './img/catalog/sofas/D-31/pre-modal-img-3.png',
      source4: './img/catalog/sofas/D-31/pre-modal-img-3.png',
      src: './img/catalog/sofas/D-31/pre-modal-img-3.png',
    },
    {
      name: 'img2',
      source1: './img/catalog/sofas/D-31/pre-modal-img-4.png',
      source2: './img/catalog/sofas/D-31/pre-modal-img-4.png',
      source3: './img/catalog/sofas/D-31/pre-modal-img-4.png',
      source4: './img/catalog/sofas/D-31/pre-modal-img-4.png',
      src: './img/catalog/sofas/D-31/pre-modal-img-4.png',
    },
  ]

  // функция получения птуей к изображению, сейчас берет их из заданного массива
  // в дальнейшем такой код может быть заменен, например, на запрос к серверу
  function getImgSource (name, sourceData=sourceImgData) {
    sourceData.forEach(function(elem) {
      if ( elem.name == name) {
        return elem;
      }
    });
    return null;
  }

  // функция для замены основного изображения
  // требует в качестве входных параметров объект с путями и номер текущего изображения
  // подразумевается что элемент picture (которую будем изменять) на странице 1!!!
  // возвращает  текущий номер изображения (который был до замены)
  function ReplaceProductMainImg(source, num) {
    let sources = document.querySelectorAll('.product__img-main .product__img-source');
    let img =  document.querySelector('.product__img-main .product__img');
    let currentData =  img.getAttribute('data');

    sources[0].setAttribute('srcset', source.source1);
    sources[1].setAttribute('srcset', source.source2);
    sources[2].setAttribute('srcset', source.source3);
    sources[3].setAttribute('srcset', source.source4);
    img.setAttribute('src', source.src);
    img.setAttribute('data', num);

    return currentData;
  }

  // функция получения обекта путей
  // если номер выходит за границы массива sourceImgData, то получит значения по умолчанию
  function getSource(num,sourceData=sourceImgData) {
    if ( (num > 0) && (num < sourceData.length ) ) {
       return sourceData[num];
    }
    return sourceData[0];
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

  //----------------------------------------------------------------------
  /* инициализация слайдера для секции similar  */
  const imgPreSwiper = new Swiper('.img-pre__swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 38,
    direction: 'horizontal',


    breakpoints: {
      // when window width is >= 280px
      280: {
        direction: 'horizontal',
        spaceBetween: 38,
      },

      // when window width is >= 520px
      520: {
        direction: 'vertical',
        spaceBetween: 18,
      },

      // when window width is >= 900px
      900: {
        direction: 'horizontal',
        spaceBetween: 38,
      },
    },

    /*
    // навигация
    navigation: {
      nextEl: '.similar__btn-next',
      prevEl: '.similar__btn-prev',
      },*/
  });


  // обработчик события для  просмотра картинок на странице продукта

  document.querySelectorAll('.product__img-preview-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      let img = btn.firstElementChild;
      let li = btn.parentElement;
      let num = 0;
      let currentNum = null;
      let source = null;
      //console.log(img);

      if ( img.hasAttribute('data') ) {
        num = img.getAttribute('data');
        if (num != NaN) {
          // получаем пути для замены
          source = getSource(num);
          currentNum = ReplaceProductMainImg(source, num);
          //прячем текущее предварительное изображение
          if (currentNum != null ) {
            // у текущего главного  убираем класс для скрытия предварительного изображения
            let temp = document.querySelector('.product__img-preview-item--hidden');
            temp.classList.remove('product__img-preview-item--hidden');

            // новому добавляем
            li.classList.add('product__img-preview-item--hidden');

            // обновляем слайдер!!!!
            imgPreSwiper.update();
          }
        }
      }
    });

  });




