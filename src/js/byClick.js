document.querySelector('.product__btn').addEventListener('click', function(event) {
  // открываем окно просмотра в модальном окне
  setModalMode('.modal-form');
  event._isClickWhitinFilter = true; // чтоб не закрыло при всплытии
})

document.querySelector('.modal-form__btn').addEventListener('click', function(event) {
  event.preventDefault();
  // чтоб не путаться предыдущее закрываем
  closeModal();
  // новое открываем
  setModalMode('.modal-info');
  event._isClickWhitinFilter = true; // чтоб не закрыло при всплытии
})

