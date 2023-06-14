function closeActiveFilter(filterActive='') {
  document.querySelectorAll('.filter__container--active').forEach(function(filter) {
    if ( filterActive != filter ) {
      filter.classList.remove('filter__container--active');
      filter.previousElementSibling.classList.remove('filter__btn--active');
    }
  });
}

function customListenerForClick(event) {
    if ( event._isClickWhitinFilter ) return;

    closeActiveFilter();

    document.removeEventListener('click',customListenerForClick);
}

function customListenerForClickWithinFilter(event) {
  event._isClickWhitinFilter = true;
}


document.querySelectorAll('.filter__btn').forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    let filter = this.parentElement.querySelector('.filter__container');

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
  btnName: '',

  saveContext(event, btnName) {
     //сохраняет текущее положение кнопки  как смещение  относительно окна браузера
    this.x = event.clientX;
    this.y = event.clientY;
    this.left = event.clientX-event.offsetX;
    this.btnName = btnName;
  },

  reset() {
    this.x = 0;
    this.y = 0;
    this.left = 0;
    this.btnName = '0';
  }
};

const positionFocus = {
  left: 0,
  btnName: '',
  focus: false,
  saveContext(left, btnName) {
    //сохраняет текущее положение кнопки  как смещение в процентах относительно внешнего контейнера
    this.left = left;
    this.btnName = btnName;
    this.focus = true;
  },

  reset() {
    this.left = 0;
    this.btnName = '';
    this.focus = false;
  }
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
    let value = (per * (this.maxLimit - this.minLimit)* 0.01);
    return parseInt(value) ;
  },

  setCurrMaxLimit(max) {
    max = max > this.maxLimit ? this.maxLimit : max;
    max = max < this.currMinLimit ? this.currMinLimit : max;

    this.currMaxLimit = max;
    this.right = this.valueInPercent(max);
  },

  setCurrMinLimit(min) {
    min = min < this.minLimit ? this.minLimit : min;
    min = min > this.currMaxLimit ? this.currMaxLimit : min;

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
  },

  // функция превращает абсолютное смещение по осиX в относительное в процентах (относительно контейнера базовой линии (бегунка))
  // проценты относительно максимальной ширины бегунка
  getOffsetLeftInPersent(newLeft) {
      let containerCoord = document.querySelector(`.${this.classRunnerContainer}`).getBoundingClientRect();
      let left = ((newLeft - containerCoord.left) * 100.0)/containerCoord.width;
      return left;
  },

  // фунция для обработки движения кнопки
  moveRunnerBtn(left, side) {
    let btn = null;
    if( side === 'left') {
      btn = document.querySelector(`.${this.classRunnerBtnLeft}`);
    }
    if( side === 'right') {
      btn = document.querySelector(`.${this.classRunnerBtnRight}`);
    }

    if (btn) {
      let btnCoord = btn.getBoundingClientRect();

      let min = this.getMinRunnerBtnPosition(side);
      let max = this.getMaxRunnerBtnPosition(side);

      left = left < min ? min: left;
      left = left > max ? max: left;

      btn.style.left =  `calc(${left}% - ${btnCoord.width/2}px`;

      this.setCurrPosRunner(left, side);
      this.drawRunnerLine(); //обновим линию бегунка
      this.updateRunneInputBlock(); // обновим значения в input
    }
  },

  // проверяет какая кнопка бегунка выбрана, правая или левая
  whatIsRunnerBtn(btn) {
    if ( btn.classList.contains(`${this.classRunnerBtnLeft}`) ) {
      return 'left';
    }

    if ( btn.classList.contains(`${this.classRunnerBtnRight}`) ) {
      return 'right';
    }
    return null;
  }
};

// функции для организации движения мышью
// обработчики событий от мыши при нажатии и удержании
function runnerBtnOnMove(event) {
  let left = runnerState.getOffsetLeftInPersent(event.clientX - positionClick.x + positionClick.left);
  runnerState.moveRunnerBtn(left, positionClick.btnName);
}

function runnerBtnStopMove(event) {
  document.removeEventListener('mousemove',runnerBtnOnMove);
  document.removeEventListener('mouseup',runnerBtnStopMove);
}

function runnnerMouseEventListener(event) {
  let btnName = runnerState.whatIsRunnerBtn(this);
  if (btnName) {
    positionClick.saveContext(event,btnName);
    document.addEventListener('mousemove',runnerBtnOnMove);
    document.addEventListener('mouseup',runnerBtnStopMove);
  }
}

// повесим обработчик на нажатие мыши
document.querySelectorAll('.runner__btn').forEach(function(btn) {
  btn.addEventListener('mousedown', runnnerMouseEventListener);
});

// повесим обработчик с отменой действия на клик, чтобы страница не перезагружалась
document.querySelectorAll('.runner__btn').forEach(function(filter) {
  filter.addEventListener('click', function(event) {
    event.preventDefault();
  });
});

// ---------------обработчики событий от клавиатуры-----------------
function runnerBtnFocus(event) {
 // event.preventDefault();
  // console.log('runnerBtnFocus');
  let btnName = runnerState.whatIsRunnerBtn(this);

  if (btnName) {
    let btnCoord = this.getBoundingClientRect();
    let left = btnCoord.left + btnCoord.width/2; // положение центра бегунка
    left = runnerState.getOffsetLeftInPersent(left); // получим значение в процентах, так удобнее для дальнейших рассетов

    positionFocus.reset();
    positionFocus.saveContext(left, btnName);

    document.addEventListener('keydown', runnerBtnKeydown);
    document.addEventListener('blur', runnerBtnBlur);
  }
}

function runnerBtnKeydown(event) {
  let step = runnerState.valueInPercent(10); // вычислим веоичину шага в %

  if ( event.key === 'ArrowRight') {
    positionFocus.left+=step;
    runnerState.moveRunnerBtn(positionFocus.left, positionFocus.btnName);
  }
  if ( event.key === 'ArrowLeft') {
    positionFocus.left-=step;
    runnerState.moveRunnerBtn(positionFocus.left, positionFocus.btnName);
  }
}

function runnerBtnBlur(event) {
  document.removeEventListener('keydown',runnerBtnKeydown);
  document.removeEventListener('focus',runnerBtnFocus);
}

// повесим обработчик на кнопку в фокусе
document.querySelectorAll('.runner__btn').forEach(function(btn) {
  btn.addEventListener('focus', runnerBtnFocus);
});

// ------------------ обработчик для ввода в поля цены
document.querySelector('.filter__input-from').addEventListener('change', function() {
  let value = Number(this.value);
  value = isNaN(value) ? runnerState.currMinLimit:value;
  runnerState.setCurrMinLimit(value);
  runnerState.update();
});

document.querySelector('.filter__input-before').addEventListener('change', function() {
  let value = Number(this.value);
  value = isNaN(value) ? runnerState.currMaxLimit:value;
  runnerState.setCurrMaxLimit(value);
  runnerState.update();
});

//--------------------- начальная инициализация -----------------
// Заданная в макете величина не соотносится с линией бегунка с математической точки зрения
// пересчитаем со значениями указанными в макете, а линию перерисуем
runnerState.setCurrMaxLimit(150000);
runnerState.setCurrMinLimit(2000);
runnerState.update();










