let clientWidth =  window.innerWidth;
 // именно эта ширина (с полосой прокрутки) используется сознательно, чтобы соотносилось с медиазапросами
//document.documentElement.clientWidth;

let initCountCardsPage = getCountCatalogCardsPage(clientWidth);
let currentCountCardsPage = initCountCardsPage; //изначально на странице 9 карточек
let maxCountCard = 18; // максимальное кол-во карточек подгружаемых на страницу //должно браться из базы данных
let currentCardsCountLoad = 9; // кол-во карточек загруженных на страницу по умоляанию
let currentPage = 1;

// количество карточек на странице
function getCountCatalogCardsPage(windowWidth) {
  if ( windowWidth <= 900 ) return 6;
  return 9;
}

// добавляет кнопке со страницей класс catalog-btn--active, у текущие убирает
function pageBtnActive(btn) {
  let btnActive =  document.querySelector('.catalog-btn--active');

  if( btnActive != btn) {
    btnActive.classList.remove('catalog-btn--active');
    btn.classList.add('catalog-btn--active');
  }
}

// функция показывает нужную страницу
// пробегает по всем элементам, ненужные скрывает с помощью catalog__item--hidden
function showCatalogPage(num) {
  let start = currentCountCardsPage * (num-1);
  let stop = currentCountCardsPage * num;

  if( stop > maxCountCard) stop = maxCountCard;

  document.querySelectorAll('.catalog__item').forEach(function (item,i) {
    if ( ( i >= start ) && (i < stop) ) {
      if (item.classList.contains('catalog__item--hidden')) {
        item.classList.remove('catalog__item--hidden');
      }
    }
    else {
      item.classList.add('catalog__item--hidden');
    }
  });
}

// скрывает или раскрывает нужное количество кнопок со страницами в зависимости от расширения экрана
function showHiddenPageBtn(countPage) {

  document.querySelectorAll('.catalog-btn').forEach(function (btn,item) {
    if( item <= (countPage-1) ){
      if (btn.classList.contains('catalog-btn--hidden')) {
        btn.classList.remove('catalog-btn--hidden');
      }
    }
    else {
      btn.classList.add('catalog-btn--hidden');
    }
  });
}

//вешаем обработчики на кнопки страниц
document.querySelectorAll('.catalog-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    let numPage =  Number(this.textContent);
    if ( (numPage != NaN) && ( numPage != currentPage ) ) {
      //если на текущий момент загружено меньше карточек, чем нужно, догружаем нужное кол-во
      let stop = currentCountCardsPage * numPage;

      if ( currentCardsCountLoad < stop ) {
        let startLoad = currentCardsCountLoad;
        let stopLoad = currentCountCardsPage * numPage;

        if( stopLoad > maxCountCard) stopLoad = maxCountCard;

        loadCards(startLoad,stopLoad);
        currentCardsCountLoad = stop;
      }

      showCatalogPage(numPage);
      //убираем текущее выделение страницы
      document.querySelector('.catalog-btn--active').classList.remove('catalog-btn--active');
      // выделяем новую
      btn.classList.add('catalog-btn--active');
      currentPage = numPage;
    }
  });
});


// пересчитываем кол-во карточек на странице если изменяется размер экрана
window.addEventListener('resize', function() {
  let newCountCardsPage = getCountCatalogCardsPage(window.innerWidth);

  if ( currentCountCardsPage != newCountCardsPage ) {
    let temp = maxCountCard/newCountCardsPage;
    if( currentPage > temp) {
      currentPage = currentPage - 1;

      document.querySelectorAll('.catalog-btn').forEach(function (btn,item) {
        if( item == (currentPage-1) ){
          btn.classList.add('catalog-btn--active');
        }
        else {
          if (btn.classList.contains('catalog-btn--active')) {
            btn.classList.remove('catalog-btn--active');
          }
        }
      });
    }
    showHiddenPageBtn(maxCountCard/newCountCardsPage) ;
    currentCountCardsPage = newCountCardsPage;
    showCatalogPage(currentPage);

  }
});


//------------------------------------------------------------------------
// Показываем первую страницу
showCatalogPage(1);
showHiddenPageBtn(maxCountCard/currentCountCardsPage) ;

