document.querySelector('.product__btn').addEventListener('click', function(event) {
  // открываем окно просмотра в модальном окне
  let modal = setModalMode('.modal-form');
  event._isClickWhitinFilter = true; // чтоб не закрыло при всплытии
})
