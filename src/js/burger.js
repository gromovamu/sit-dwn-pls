let burger = document.querySelector('.burger');
let headerNavTop = document.querySelector('.header__top-nav');
let headerNavBottom = document.querySelector('.header__bottom-nav');

function closeBurgerMenu() {
  headerNavTop.classList.remove('header__top-nav--active');
  headerNavBottom.classList.remove('header__bottom-nav--active');
  burger.classList.remove('burger-close');
}

//добавляем обработчик для кнопки раскрытия бургер меню
burger.addEventListener('click',
  function () {
    headerNavTop.classList.toggle('header__top-nav--active');
    headerNavBottom.classList.toggle('header__bottom-nav--active');
    burger.classList.toggle('burger-close');
  }
);

//добавляем обработчик закрытия меню при переходе по ссылке
document.querySelectorAll('.header__bottom-nav-item .nav-link-decor2').forEach(function (link) {
  link.addEventListener('click', function (event) {
        //закрывем бургер-меню если оно открыто
        if( headerNavBottom.classList.contains('header__bottom-nav--active') ) {
          closeBurgerMenu() ;
        }
  });
});

document.querySelectorAll('.header__top-nav-item .nav-link-decor').forEach(function (link) {
  link.addEventListener('click', function (event) {
        //закрывем бургер-меню если оно открыто
        if( headerNavTop.classList.contains('header__top-nav--active') ) {
          closeBurgerMenu() ;
        }
  });
});
