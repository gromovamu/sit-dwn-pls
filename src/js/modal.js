//функции для работы с модальным режимом

// фунция устанавливает модальный режим путем добавления класса modal-mode к body
function setModalMode (modalSelector) {
  document.querySelector('.body').classList.add('modal-mode');
  let modal = document.querySelector(modalSelector);
  modal.classList.add('modal--active');
  // прокрутим окно к началу
  scrollTo(0,0);

  // добавляем обработчик события для клика на самом модальном окне
  modal.addEventListener('click', clickWithinModal);

  // добавляем обработчик события для клика вне модального окна
  document.querySelector('.modal-mode').addEventListener('click', customClick);

  //добавим обработчик события для закрытия модального окна с изображениями
  let closeBtn = modal.querySelector('.modal-close-btn');

  if ( closeBtn ) { // если в окне есть кнопка с соответсвующим классом
    closeBtn.addEventListener( 'click', closeModal);
  }
  return modal;
}

// фунция убирает модальный режим путем удаления класса modal-mode из body
function closeModalMode () {
 document.querySelector('.body').classList.remove('modal-mode');
}

// функция закрытия модального окна
function closeModal(event = null) {
  if(event !== null) event.preventDefault();

  // закрываем окно просмотра
  let modal =  document.querySelector('.modal--active');
  if (modal) {
    modal.classList.remove('modal--active');
  }

  // удаляем обработчик
  document.querySelector('.modal-mode').removeEventListener('click', customClick);
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
