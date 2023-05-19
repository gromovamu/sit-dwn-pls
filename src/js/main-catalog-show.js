let clientWidth =  window.innerWidth;
 // именно эта ширина (с полосой прокрутки) используется сознательно, чтобы соотносилось с медиазапросами
//document.documentElement.clientWidth;
let initCountCardsShow = getCountCatalogCards(clientWidth);
let currentCountCardsShow = initCountCardsShow;
let currentCountCardsLoad = 8; //изначально на странице 8 карточек
let maxCountCard = 18; // максимальное кол-во карточек подгружаемых на страницу

function getCountCatalogCardLine(windowWidth) {
  if ( windowWidth < 900 ) return 4;
  if ( windowWidth <= 1200 ) return 3;
  return 4;
}

function getCountCatalogCards(windowWidth) {
  if ( windowWidth <= 1200 ) return 6;
  return 8;
}

//функция скрывает лишние карточки или открывает скрытые
function showCatalogCards() {
  document.querySelectorAll('.catalog__item').forEach(function (item,i) {
    if( i >= currentCountCardsShow ) {
      item.classList.add('catalog__item--hidden');
    }
    else {
      if (item.classList.contains('catalog__item--hidden')) {
        item.classList.remove('catalog__item--hidden');
      }
    }
  });
}

//вешаем обработчик на кнопку "Показать больше"
document.querySelector('.top__btn').addEventListener('click',
  function () {
    if (currentCountCardsShow < maxCountCard) {
      //console.log('last currentCountCardsShow:' + currentCountCardsShow);
      currentCountCardsShow = currentCountCardsShow + getCountCatalogCardLine(window.innerWidth);
      //console.log('getCountCatalogCardLine:' + getCountCatalogCardLine(window.innerWidth));
      //console.log('new currentCountCardsShow:' + currentCountCardsShow);
      //console.log('currentCountCardLoad:' + currentCountCardsLoad);

      // догрузи еще, если надо
      if (currentCountCardsShow > currentCountCardsLoad) {
        loadCards(currentCountCardsLoad, currentCountCardsShow);
        currentCountCardsLoad = currentCountCardsLoad + (currentCountCardsShow - currentCountCardsLoad);
        //console.log('new currentCountCardsLoad:' + currentCountCardsLoad);
      }

      // покажем скрытые, если есть
      showCatalogCards();

      if (currentCountCardsShow >= maxCountCard) {
        this.classList.add('btn-decor1--disabled');
        this.setAttribute("disabled", "");
      }
    }
  }
);

// пересчитываем кол-во карточек если изменяется размер
// если были открыты дополнительные карточки, то кол-во сохранится
window.addEventListener('resize', function() {
  if ( currentCountCardsShow === initCountCardsShow) {
    let current_clientWidth = window.innerWidth;
    initCountCardsShow = getCountCatalogCards(current_clientWidth);
    currentCountCardsShow = initCountCardsShow;
    showCatalogCards();
  }
});


//------------------------------------------------------------------------
// Показываем нужное кол-во карточек в зависимости от разрешения экрана
showCatalogCards();

