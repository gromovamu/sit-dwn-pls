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

const runnerState = {
  //значения по умолчанию, я задала исходя из текущего макета, но математически они не верны
  left: 5.06,  // положение левого конца линии бегунка в процентах
  right: 67.56, // положение правого конца линии бегунка в процентах
  maxLimit: 200000, //максимально возможный лимит
  minLimit: 0, // минимально возможный лимит
  currMaxLimit: 150000, // заданный текущий максимальный лимит
  currMinLimit: 2000, // заданный текущий минимальный лимит
  classRunnerContainer: 'runner',
  classRunnerLine: 'runner__line',
  classRunnerBtnLeft: 'runner__btn-left',
  classRunnerBtnRight: 'runner__btn-right',
  classRunnerInputFrom: 'filter__input-from',
  classRunnerInputBefore: 'filter__input-before',

  valueInPercent(value) {
    return (value * 100) / (this.maxLimit - this.minLimit);
  },

  percentInValue(per) {
    return parseInt((per * (this.maxLimit - this.minLimit)) * 0.01);
  },

  setCurrMaxLimit(max) {
    max = max > this.maxLimit ? this.maxLimit : max;
    max = max < this.currMinLimit ? currMinLimit : max;

    this.currMaxLimit = max;
    this.right = this.valueInPercent(max);
  },

  setCurrMinLimit(min) {
    min = min < this.minLimit ? this.minLimit : min;
    min = min > this.currMaxLimit ? currMaxLimit : min;

    this.currMinLimit = min;
    this.left = this.valueInPercent(min);
  },

  setCurrLeftRunner(left) {
    this.left = left;
    this.currMinLimit = this.percentInValue(left);
  },

  setCurrRightRunner(right) {
    this.right = right;
    this.currMaxLimit = this.percentInValue(right);
  },

  setCurrPosRunner(percent, side) {
    if ( side === 'left') {
      this.setCurrLeftRunner(percent);
    }
    if ( side === 'right') {
      this.setCurrRightRunner(percent);
    }
  },

  drawRunnerLine() {
    let line = document.querySelector(`.${this.classRunnerLine}`);
    line.style.left = `${this.left}%`;
    line.style.width = `${this.right - this.left}%`;
  },

  updateRunneInputBlock() {
    document.querySelector(`.${this.classRunnerInputFrom}`).value = this.currMinLimit;
    document.querySelector(`.${this.classRunnerInputBefore}`).value = this.currMaxLimit;
  },

  //функция приводит положение кнопок в соответвии с отрисованной линией бегунка
  updateBtnRunner() {
    let widthBtnLeft = document.querySelector(`.${this.classRunnerBtnLeft}`).getBoundingClientRect().width;
    let widthBtnRight = document.querySelector(`.${this.classRunnerBtnRight}`).getBoundingClientRect().width;

    document.querySelector(`.${this.classRunnerBtnLeft}`).style.left = `calc(${this.left}% - ${widthBtnLeft/2}px`;
    document.querySelector(`.${this.classRunnerBtnRight}`).style.left = `calc(${this.right}% - ${widthBtnRight/2}px`
  },

  update() {
    this.drawRunnerLine();
    this.updateRunneInputBlock();
    this.updateBtnRunner();
  },

  getMinRunnerBtnPosition(side) {
    if (side == 'right') {
      return this.left;
    }
    return 0;
  },

  getMaxRunnerBtnPosition(side) {
    if (side == 'left') {
      return this.right;
    }
    return 100;
  }
};


function onMove(event) {
  event.preventDefault();
  if( positionClick.moveElem ) {
    // я добавила в формулу positionClick.containerLeft,
    // т.к. у нашего элемента позиционирование абсолютное, относительно родительского элемента
    let left = event.clientX - positionClick.x + positionClick.left - positionClick.containerLeft;

    let min = runnerState.getMinRunnerBtnPosition(positionClick.btn);
    let max = runnerState.getMaxRunnerBtnPosition(positionClick.btn);

    left = (left * 100)/positionClick.containerWidth;

    top = positionClick.top - positionClick.containerTop;

    left = left < min ? min: left;
    left = left > max ? max: left;

    positionClick.moveElem.style.left =  `calc(${left}% - ${positionClick.width/2}px`;
    positionClick.moveElem.style.top = `${top}px`

    runnerState.setCurrPosRunner(left, positionClick.btn);
    runnerState.drawRunnerLine(); //обновим линию бегунка
    runnerState.updateRunneInputBlock(); // обновим значения в input
  }
}

function stopMove(event) {
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
runnerState.setCurrMaxLimit(150000);
runnerState.setCurrMinLimit(2000);
runnerState.update();










