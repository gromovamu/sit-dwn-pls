function closeActiveFilter(filterActive='') {
  document.querySelectorAll('.filter__container--active').forEach(function(filter) {
    if ( filterActive != filter ) {
      filter.classList.remove('filter__container--active');
      filter.previousElementSibling.classList.remove('filter__btn--active');
    }
  });
}

function customListenerForClick(event) {
  //console.log('customListenerForClick');
  //console.log(event._isClickWhitinFilter);

    if ( event._isClickWhitinFilter ) return;

    closeActiveFilter();
    //console.log('close');

    document.removeEventListener('click',customListenerForClick);
}

function customListenerForClickWithinFilter(event) {
  event._isClickWhitinFilter = true;
  //console.log('customListenerForClickWithinFilter');
}


document.querySelectorAll('.filter__btn').forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    //console.log(this);
    let filter = this.parentElement.querySelector('.filter__container');

      //console.log(filter);

    // проверим, если есть другие открытые фильтры закроем, а то у меня так огранизовано,
    // что если на любую кнопку жать то _isClickWhitinFilter тоже установится, и закрытие не сработает
    closeActiveFilter(filter);

    if ( !filter.classList.contains('filter__container--active') ) {
      //console.log('filter no is active -> active');
      filter.classList.add('filter__container--active');
      btn.classList.add('filter__btn--active');

      event._isClickWhitinFilter = true; //чтоб не закрывалось вновь открытое

      document.addEventListener('click',customListenerForClick);
    }
    else {
      //console.log('filter is active');
      //console.log(event._isClickWhitinFilter);
    }

  });
});



//--------- работа с фильтром цены ----------------------
const positionClick = {
  x: 0,
  y: 0,
  left: 0,
  top: 0,
  width: 0,
  containerWidth: 0,
  containerHeight: 0,
  containerLeft: 0,
  containerTop: 0,
  moveElem: null,
  btn: '',
};

const priceState = {
  left: 5.06,
  right: 67.56,
  maxPrice: 250000, //максимально возможная
  minPrice: 0, // минимальная
  currMaxPrice: 150000, // заданная для фильтрации максимальная цена
  currMinPrice: 2000, // заданная для фильтрации минимальная цена
}; //эти я задала исходя из макета, но математически они не верны
// максимальная и минимальная цена тоже ведь могут менятся в зависимости от товаров

function priceInPercent(price) {
  return (price * 100) / (priceState.maxPrice - priceState.minPrice);
}

function percentInPrice(per) {
  return parseInt((per * (priceState.maxPrice - priceState.minPrice)) * 0.01); // /100
}

function setCurrMaxPrice(max) {
  max = max > priceState.maxPrice ? priceState.maxPrice : max;
  max = max < priceState.currMinPrice ? currMinPrice : max;

  priceState.currMaxPrice = max;
  priceState.right = priceInPercent(max);
  updatePrice();
}

function setCurrMinPrice(min) {
  min = min < priceState.minPrice ? priceState.minPrice : min;
  min = min > priceState.currMaxPrice ? currMaxPrice : min;

  priceState.currMinPrice = min;
  priceState.left = priceInPercent(min);
  updatePrice();
}

function setCurrLeftPrice(left) {
  priceState.left = left;
  priceState.currMinPrice = percentInPrice(left);
  updatePrice();
}

function setCurrRightPrice(right) {
  priceState.right = right;
  priceState.currMaxPrice = percentInPrice(right);
  updatePrice();
}

function setCurrPosPrice(percent, btn) {
  if ( btn === 'left') {
    setCurrLeftPrice(percent);
  }
  if ( btn === 'right') {
    setCurrRightPrice(percent);
  }
}

function drawRunnerLine(price = priceState) {
  let line = document.querySelector('.runner__line');
  line.style.left = `${price.left}%`;
  line.style.width = `${price.right - price.left}%`;
}

function updatePriceBlock(price = priceState) {
  console.log(priceState);
  document.querySelector('.filter__input-from').value = priceState.currMinPrice;
  document.querySelector('.filter__input-before').value = priceState.currMaxPrice;
}

function updatePrice() {
  drawRunnerLine();
  updatePriceBlock();
}

function updateBtnPrice() {

}

//обработчики бегунка
function getMinPosition(pointer = positionClick, price = priceState) {
  if (pointer.btn == 'right') {

    return ((price.left*pointer.containerWidth)*0.01 - (pointer.width / 2));
  }
  return -1 * (pointer.width / 2);
}

function getMaxPosition(pointer = positionClick, price = priceState) {
  if (pointer.btn == 'left') {

    return ((price.right*pointer.containerWidth)*0.01 - (pointer.width / 2));
  }
  return (pointer.containerWidth - pointer.width / 2);
}

function onMove(event) {
  event.preventDefault();
  if( positionClick.moveElem ) {
     //console.log('onMove');

    // я добавила в формулу positionClick.containerLeft,
    // т.к. у нашего элемента позиционирование абсолютное, относительно родительского элемента
    let left = event.clientX - positionClick.x + positionClick.left - positionClick.containerLeft;
    //let top = event.clientY - positionClick.y + positionClick.top - positionClick.containerTop;;

    let min = getMinPosition(); //-1 * (positionClick.width / 2);
    let max = getMaxPosition(); //positionClick.containerWidth - positionClick.width / 2;

    left = left < min ? min: left;
    left = left > max ? max: left;
    top = positionClick.top - positionClick.containerTop;

    positionClick.moveElem.style.left = `${left}px`;
    positionClick.moveElem.style.top = `${top}px`

    setCurrPosPrice(((left + positionClick.width /2)*100) / positionClick.containerWidth, positionClick.btn);
  }
}

function stopMove(event) {
  //console.log('stopMove');
  document.removeEventListener('mousemove',onMove);
  document.removeEventListener('mouseup',stopMove);
}

document.querySelectorAll('.runner__btn').forEach(function(filter) {
  filter.addEventListener('mousedown', function(event) {
    event.preventDefault();
    let btnCoord = this.getBoundingClientRect();
    let containerCoord = this.parentElement.getBoundingClientRect();

    positionClick.moveElem = this;

    positionClick.containerLeft = containerCoord.left;
    positionClick.containerTop = containerCoord.top;
    positionClick.containerWidth = containerCoord.width;
    positionClick.containerHeight = containerCoord.height;
    positionClick.x = event.clientX;
    positionClick.y = event.clientY;
    positionClick.left = btnCoord.left;
    positionClick.top = btnCoord.top;
    positionClick.width = btnCoord.width;

    if (this.classList.contains('runner__btn-left')) {
      positionClick.btn = 'left';
    }

    if (this.classList.contains('runner__btn-right')) {
      positionClick.btn = 'right';
    }

    //console.log(btnCoord);
    //console.log(containerCoord);
    //console.log(positionClick);
    //console.log(event);

    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',stopMove);
  });
});

document.querySelectorAll('.runner__btn').forEach(function(filter) {
  filter.addEventListener('click', function(event) {
    event.preventDefault();
  });
});

// Заданная в макете величина не соотносится с линией бегунка с математической точки зрения
// пересчитаем со значениями указанными в макете, а линию перерисуем
setCurrMaxPrice(150000);
setCurrMinPrice(2000);










