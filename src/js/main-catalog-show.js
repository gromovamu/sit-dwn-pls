let clientWidth =  window.innerWidth;
 // именно эта ширина (с полосой прокрутки) используется сознательно, чтобы соотносилось с медиазапросами
//document.documentElement.clientWidth;
let initCountCardsShow = getCountCatalogCards(clientWidth);
let currentCountCardsShow = initCountCardsShow;

function getCountCatalogCardLine(windowWidth) {
  if ( windowWidth < 900 ) return 2;
  if ( windowWidth <= 1200 ) return 3;
  return 4;
}

function getCountCatalogCards(windowWidth) {
  if ( windowWidth <= 1200 ) return 6;
  return 8;
}

//Скрываем лишние карточки или открывает скрытые
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

showCatalogCards();

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
