document.querySelectorAll('.filter__btn').forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(this);

    let filter = this.nextElementSibling; //следующий элемент с классом filter__container дллжен идти сразу после кнопки
    console.log(filter);

    if ( filter.classList.contains('filter__container') ) {
      filter.classList.toggle('filter__container--active');
    }
  });
});

