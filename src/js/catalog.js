/*Этот файл будет содержать условную базу данных,
 в идеале тут должны быть функции для получения данных с сервера */

 let catalogBase = [
  {
    estimation: 5.0,
    name: 'Диван кожаный \“R-94\”',
    price: '94 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-1.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-1.png',
  },
  {
    estimation: 4.9,
    name: 'Диван апартековый \“T-75\”',
    price: '69 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-2.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-2.png',
  },
  {
    estimation: 4.8,
    name: 'Диван тканевый \“D-31\”',
    price: '28 490 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-3.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-3.png',
  },
  {
    estimation: 4.8,
    name: 'Диван велюровый \“Y-68\”',
    price: '22 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-4.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-4.png',
  },
  {
    estimation: 4.8,
    name: 'Диван из шинила \“W-95\”',
    price: '22 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-5.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-5.png',
  },
  {
    estimation: 4.8,
    name: 'Диван флоковый \“G-41\”',
    price: '17 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-6.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-6.png',
  },
  {
    estimation: 4.8,
    name: 'Диван шиниловый \“V-43\”',
    price: '19 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-7.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-7.png',
  },
  {
    estimation: 4.7,
    name: 'Диван велюровый \“S-99\”',
    price: '19 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-8.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-8.png',
  },
  {
    estimation: 4.7,
    name: 'Диван из кожзама \“F-85\”',
    price: '26 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-9.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-9.png',
  },
  {
    estimation: 4.6,
    name: 'Диван флоковый \“H-64\”',
    price: '25 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-10.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-10.png',
  },
  {
    estimation: 4.6,
    name: 'Диван флоковый \“H-58\”',
    price: '23 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-11.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-11.png',
  },
  {
    estimation: 4.6,
    name: 'Диван из кожзама \“R-43\”',
    price: '33 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-12.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-12.png',
  },
  {
    estimation: 4.6,
    name: 'Диван из шинила \“С-42\”',
    price: '18 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-13.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-13.png',
  },
  {
    estimation: 4.6,
    name: 'Диван велюровый \“U-58\”',
    price: '21 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-14.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-14.png',
  },
  {
    estimation: 4.5,
    name: 'Диван флоковый “F-41”',
    price: '17 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-15.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-15.png',
  },
  {
    estimation: 4.5,
    name: 'Диван велюровый \“R-85\”',
    price: '34 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-16.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-16.png',
  },
  {
    estimation: 4.5,
    name: 'Диван велюровый \“S-44\”',
    price: '19 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-17.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-17.png',
  },
  {
    estimation: 4.4,
    name: 'Диван из шинила \“С-80\”',
    price: '20 990 руб',
    imgUrl: './img/catalog/sofas/basic/catalog-img-18.png',
    sourceUrl: './img/catalog/sofas/320/catalog-img-320-18.png',
  },
 ];

 // функции простые, без проверок на форматы параметров и прочее, только чтобы показать верстку
 // функция генерит html-код карточки
 //TODO: если будет время передеать на нормальую генерацию, сейчас не совсем корректно
 function loadCard(card) {
    let cardName = card.name.replace('-', '&#8209;');
    let cardPrice = card.price.replace(' ', '&nbsp;');

    let textCard = `<li class=\"catalog__item\"> <div class=\"estimation\"> <svg class=\"star\" viewBox=\"0 0 16 15\"\> <use xlink:href=\"#star\"> </use> </svg> <span class=\"estimation-descr\"> 5,0 </span></div> <picture  class=\"catalog__picture\"> <source srcset=\" ${card.sourceUrl} \" media=\"(max-width: 520px)\"> <img class=\"catalog__img \" src=\"${card.imgUrl}\" alt=\"изображение товара\"> </picture><div class=\"catalog__descr-container\"> <h3 class=\"catalog__name\"> ${cardName} </h3> <p class=\"catalog__price\"> ${cardPrice}</p> <a class=\"link btn-decor2\" href=\"product.html\">Купить</a> </div> </li> `;

   // console.log(textCard)
    return textCard;
 }

// это условная фунция, здесь мог бы быть код запроса на сервер
// функция работает изходя из условия, что карточки догружаются в конец  существующего списка (она не универсальная)
// она не проверяет индексы
 function loadCards(indexStart,indexStop) {
   let loadBlock = catalogBase.slice(indexStart, indexStop);
   //console.log(loadBlock);
   let htmlTextCards='';

   loadBlock.forEach(function (card) {
    htmlTextCards += loadCard(card);
   });

   //console.log(htmlTextCards);
   //вставляем сгенерированный код в конец каталога
   let lastItem = document.querySelector('.catalog__item:last-child');
   //console.log(lastItem);
   lastItem.insertAdjacentHTML('afterend', htmlTextCards);
 }

 //я понимаю, что функции не оптимальны, здесь у меня не было цели продумать все досканально, т.к. в реальной работе эти функии не понадобились бы, т.к были бы другие, для работы с сервером. Здесь не ставила себе цель продумать взаимодействие с ним т.к. в центре анимания была верстка
