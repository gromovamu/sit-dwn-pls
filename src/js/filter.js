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


document.querySelectorAll('.filter__container').forEach(function(filter) {
  filter.addEventListener('click',customListenerForClickWithinFilter)
});







