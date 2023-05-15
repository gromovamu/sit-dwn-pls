var telField = document.querySelector('.feedback__input-tel');

var im = new Inputmask("+7(999) 999-99-99");
im.mask(telField);

new JustValidate('.feedback__form', {
  colorWrong: '#FF6972',
  rules: {
    name: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = telField.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      }
    },
    agreement: {
      required: true,
    }
  },
  messages: {
    name: {
      required: 'Вы не ввели имя',

    },
    email: {
      required: 'Вы не ввели e-mail',
      email: 'Вы ввели некорректный e-mail'
    },
    tel: {
      required: 'Вы не ввели телефон',
      function: 'Вы ввели номер телефона не полностью'
    },
  }
});

/*var re = /^\w+$/;
if (!re.test(field.value)) {
    alert('Invalid Text');
    return false;
}
return true;*/

