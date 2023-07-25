let burger = document.querySelector('.burger');
let burgerMenu = document.querySelector('.burger-menu');

//let headerNavTop = document.querySelector('.burger-menu .header__top-nav');
//let headerNavBottom = document.querySelector('.burger-menu .header__bottom-nav');

function closeBurgerMenu() {
  burgerMenu.classList.remove('burger-menu--active');
  burger.classList.remove('burger-close');
  document.removeEventListener('click',customListenerForMenuClick);
  burgerMenu.removeEventListener('click', customListenerForClickWithinMenu);
}

function customListenerForMenuClick(event) {
  if ( event._isClickWhitinMenu ) return;
  closeBurgerMenu();
}

function customListenerForClickWithinMenu(event) {
  event._isClickWhitinMenu = true;
}

//добавляем обработчик для кнопки раскрытия бургер меню
burger.addEventListener('click',
  function (event) {
    if ( this.classList.contains('burger-close') ){
      closeBurgerMenu();
    }
    else {
      burgerMenu.classList.add('burger-menu--active');
      burger.classList.add('burger-close');
      burgerMenu.setAttribute('style','transition: visibility 0.6s ease-in, transform 0.6s ease-in');
      burgerMenu.addEventListener('click', customListenerForClickWithinMenu);
      document.addEventListener('click', customListenerForMenuClick);
      event._isClickWhitinMenu = true;
    }
  }
);

burgerMenu.addEventListener('transitionend', function(event) {
  if (!burgerMenu.classList.contains('burger-menu--active') ) {
    burgerMenu.removeAttribute('style');
  }
});

//добавляем обработчик закрытия меню при переходе по ссылке
document.querySelectorAll('.header__bottom-nav-item .nav-link-decor2').forEach(function (link) {
  link.addEventListener('click', function (event) {
        //закрывем бургер-меню если оно открыто
        if( burgerMenu.classList.contains('burger-menu--active') ) {
          closeBurgerMenu() ;
        }
  });
});

document.querySelectorAll('.header__top-nav-item .nav-link-decor').forEach(function (link) {
  link.addEventListener('click', function (event) {
        //закрывем бургер-меню если оно открыто
        if( burgerMenu.classList.contains('burger-menu--active') ) {
          closeBurgerMenu() ;
        }
  });
});
