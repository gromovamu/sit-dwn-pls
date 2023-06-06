// массив содержит элементы с содержимым путей к изображениям для демонстрации товара
  // используется такой подход т.к. структура может меняться и на данный момент у меня нет необходимых изображений
  // т.к. они не предоставлены в макете были взяты изображения из картинок для модального окна
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

// структура аналогичная предыдущей для организации просмотра в модальном окне
// она совпадает, т.к. нет нормальных изборажений для просмотра товара (больших картинок для видов сбоку)
let sourceModalImgData = [ {
  name: 'img0',
  source1: './img/catalog/sofas/D-31/main-img-320.png',
  source2: './img/catalog/sofas/D-31/main-img-1024.png',
  source3: './img/catalog/sofas/D-31/main-img.png',
  source4: './img/catalog/sofas/D-31/main-modal-img.png',
  src: './img/catalog/sofas/D-31/main-modal-img.png',
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

// функция для замены основного изображения
// требует в качестве входных параметров объект с путями и номер текущего изображения
// класс элемента picture который будем изменять
// возвращает  текущий номер изображения (который был до замены)
function ReplaceProductMainImg(source, num, pictureClassName) {
  let sources = document.querySelectorAll(`.${pictureClassName}  .img-source`);
  let img =  document.querySelector(`.${pictureClassName} .img`);
  let currentData = 0;

  if (img !== null )
  {

    currentData =  img.getAttribute('data');
    if( sources.length != 0) {
      sources[0].setAttribute('srcset', source.source1);
      sources[1].setAttribute('srcset', source.source2);
      sources[2].setAttribute('srcset', source.source3);
      sources[3].setAttribute('srcset', source.source4);
      img.setAttribute('src', source.src);
      img.setAttribute('data', num);
    }
    else {
      console.error(`ReplaceProductMainImg: Error. Can\'t find element with class \' .${pictureClassName}  .img-source \'`);
    }
  }
  else {
    console.error(`ReplaceProductMainImg: Error. Can\'t find element with class \' .${pictureClassName}  .img \'`);
  }


  return currentData;
}

// функция получения обекта путей
// если номер выходит за границы массива sourceImgData, то получит значения по умолчанию
function getSource(num, sourceData=sourceImgData) {
  if ( (num > 0) && (num < sourceData.length ) ) {
     return sourceData[num];
  }
  return sourceData[0];
}

// обработчик кнопок просморта изображений
function btnLoadPrevImgListener(btn, sourceData=sourceImgData, pictureClassName, listClassName) {
  let img = btn.firstElementChild;
  let li = btn.parentElement;
  let num = 0;
  let currentNum = null;
  let source = null;
 // console.log(img);
 // console.log(btn);
 // console.log(sourceData);

  if ( img.hasAttribute('data') ) {
    num = Number(img.getAttribute('data'));
    if (!isNaN(num)) {
      // получаем пути для замены
      source = getSource(num,sourceData);
      currentNum = ReplaceProductMainImg(source, num, pictureClassName);
    }
  }
}

// фунция устанавливает модальный режим путем добавления класса modal-mode к body
function setModalMode () {
   document.querySelector('.body').classList.add('modal-mode');
}

// фунция убирает модальный режим путем удаления класса modal-mode из body
function closeModalMode () {
  document.querySelector('.body').classList.remove('modal-mode');
}
//----------------------------------------------------------------------
  /* инициализация слайдера для блока с превью  */
  const imgPreSwiper = new Swiper('.img-pre__swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 38,
    direction: 'horizontal',
    initialSlide: 1,


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
  });


  /* инициализация слайдера для блока с превью  */
  const modalPreSwiper = new Swiper('.modal__swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 78,
    direction: 'horizontal',
    initialSlide: 1,

    breakpoints: {
      // when window width is >= 280px
      280: {
        slidesPerView: 1,
        spaceBetween: 10,
      },

      // when window width is >= 520px
      520: {
        slidesPerView: 'auto',
        spaceBetween: 64,
      },

      // when window width is >= 760px
      760: {
        slidesPerView: 'auto',
        spaceBetween: 78,
      },
    },

    // навигация
    navigation: {
      nextEl: '.modal__btn-next',
      prevEl: '.modal__btn-prev',
      },
  });


// обработчик события для  просмотра картинок на странице продукта
document.querySelectorAll('.product__img-preview-btn').forEach(function (btn) {
  btn.addEventListener('click', function() {
    btnLoadPrevImgListener(btn, sourceImgData, 'product__img-main','product__img-pre-list');
  });
});

// обработчик события для  просмотра картинок в модальном окне
document.querySelectorAll('.modal__img-preview-btn').forEach(function (btn) {
  btn.addEventListener('click', function() {
    //console.log('event listener_modal prev');
    btnLoadPrevImgListener(btn, sourceModalImgData,'modal__img-main','modal__img-pre-list');
  });
});


// добавим обработчик события для открытия модального окна с изображениями
document.querySelector('.product__img-btn').addEventListener( 'click', function() {
  //console.log('modal mode active')
  setModalMode();
  // открываем окно просмотра
  document.querySelector('.modal-img').classList.add('modal--active');
  // если открыто не первое изображение, то загружаем аналогичное тому, которое сейчас выбрано основным
  // но из изображений для модального окна
  // действия аналогичны обработчику кнопки превью, так что воспользуемя функцией для обработчика
  // но сначала определим номер изображения
  let img = document.querySelector('.product__img-btn .img');
  let num = Number(img.getAttribute('data'));
  if( !isNaN(num) ) {
    document.querySelectorAll('.modal__img-preview-btn').forEach(function(btn) {
      if( Number(btn.firstElementChild.getAttribute('data')) == num) {
        btnLoadPrevImgListener(btn,sourceModalImgData,'modal__img-main','modal__img-pre-list');
      }
    });
  }
});

//добавим обработчик события для закрытия модального окна с изображениями
document.querySelector('.modal-close-btn').addEventListener( 'click', function() {
  // закрываем окно просмотра
  document.querySelector('.modal-img').classList.remove('modal--active');
  // убираем модальный режим
  closeModalMode();
});
