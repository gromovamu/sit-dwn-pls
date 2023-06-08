let telField = document.querySelector('.feedback__input-tel');

let im = new Inputmask("+7(999) 999-99-99");

im.mask(telField);

let modalFormValid = new JustValidate('.modal__form', {
  colorWrong: '#FF6972',
  rules: {
    name: {
      required: true,
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
    tel: {
      required: 'Вы не ввели телефон',
      function: 'Вы ввели номер телефона не полностью'
    },
  }
});

