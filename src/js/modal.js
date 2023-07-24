//функции для работы с модальным режимом

// фунция устанавливает модальный режим путем добавления класса modal-mode к body
function setModalMode (modalId) {
  document.querySelector('.body').classList.add('stop_scroll');
  let modal = document.getElementById(modalId);

  let modalContent = modal.querySelector('.modal___content');

  modal.classList.add('modal--active');
  // добавляем обработчик события для клика на самом модальном окне
  modalContent.addEventListener('click', clickWithinModal);

  // добавляем обработчик события для клика вне модального окна
  modal.addEventListener('click', customClick);

  //добавим обработчик события для закрытия модального окна с изображениями
  let closeBtn = modal.querySelector('.modal-close-btn');

  if ( closeBtn ) { // если в окне есть кнопка с соответсвующим классом
    closeBtn.addEventListener( 'click', closeModal);
  }
  return modal;
}

// фунция убирает модальный режим путем удаления класса stop_scroll из body
function closeModalMode () {
 document.querySelector('.body').classList.remove('stop_scroll');
}

// функция закрытия модального окна
function closeModal(event = null) {
  if(event !== null) event.preventDefault();

  // закрываем окно просмотра
  let modal =  document.querySelector('.modal--active');
  if (modal) {
    modal.classList.remove('modal--active');
    // удаляем обработчик для клика вне модального окна
    modal.removeEventListener('click', customClick);
  }

  // убираем модальный режим
  closeModalMode();
}

function clickWithinModal(event) {
 event._isClickWhitinFilter = true;
}

function customClick(event) {
 if( event._isClickWhitinFilter ) return;
 closeModal();
}
