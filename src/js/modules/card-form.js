import { fullMenuClose } from './fullMenu.js';

const baseClassName = 'card-form';

const membershipPlan = ({ title, price, description, baseClassName = '', formContainer }) => {
  const titleTrimmed = title.replace(' ', '_');

  const inputContainer = document.createElement('div');
  inputContainer.classList.add(`${baseClassName}__membership-plan-box`);

  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'membership-plan';
  input.value = titleTrimmed;
  input.id = titleTrimmed;
  input.classList.add(`${baseClassName}__membership-plan-input`);

  const label = document.createElement('label');
  label.setAttribute('for', titleTrimmed);
  label.classList.add(`${baseClassName}__membership-plan-label`);
  label.addEventListener('click', () => {
    formContainer.classList.add('transform');
  });

  const priceTitle = document.createElement('span');
  priceTitle.classList.add(`${baseClassName}__membership-plan-title`);
  priceTitle.textContent = title;

  const priceInfo = document.createElement('span');
  priceInfo.classList.add(`${baseClassName}__membership-plan-price`);
  priceInfo.innerHTML = `$<span class="${baseClassName}__membership-plan-price-box">${price}</span> per month`;

  const descriptionInfo = document.createElement('p');
  descriptionInfo.classList.add(`${baseClassName}__membership-plan-description`);
  descriptionInfo.textContent = description;

  inputContainer.appendChild(input);
  inputContainer.appendChild(label);
  label.appendChild(priceTitle);
  label.appendChild(priceInfo);
  label.appendChild(descriptionInfo);

  return inputContainer;
};

export const cardForm = () => {
  const form = document.createElement('form');
  form.classList.add(baseClassName);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const formTitle = document.createElement('p');
  formTitle.classList.add(`${baseClassName}__title`);
  formTitle.textContent = 'CHOOSE YOUR MEMBERSHIP PLAN';

  const formContainer = document.createElement('div');
  formContainer.classList.add(`${baseClassName}__container`);

  const submitButtonContainer = document.createElement('div');
  submitButtonContainer.classList.add(`${baseClassName}__submit-container`);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'GET ACCESS NOW';
  submitButton.classList.add(`${baseClassName}__submit`);

  const cardFormCard = document.createElement('div');
  cardFormCard.classList.add(`${baseClassName}__card`);

  const cardInfoContainer = document.createElement('div');
  cardInfoContainer.classList.add(`${baseClassName}__card-info-container`);

  const cardFieldsGroup = document.createElement('div');
  cardFieldsGroup.classList.add(`${baseClassName}__card-fields-group`);

  const cardFieldsGroup2 = cardFieldsGroup.cloneNode(true);
  cardFieldsGroup2.classList.add(`--cvv-date`);

  const cardNumber = document.createElement('input');
  cardNumber.type = 'text';
  cardNumber.classList.add(`${baseClassName}__card-input`);
  cardNumber.setAttribute('placeholder', '1234 1234 1234 1234');
  cardNumber.setAttribute('inputmode', 'numeric');
  cardNumber.setAttribute('required', true);
  cardNumber.addEventListener('keypress', (event) => {
    event.preventDefault();
    let symbol = String.fromCharCode(event.keyCode);

    if (symbol && /^[0-9]+$/.test(symbol) && event.target.value.length < 16) {
      event.target.value += symbol;
    }
  });

  const cardCVV = document.createElement('input');
  cardCVV.type = 'text';
  cardCVV.classList.add(`${baseClassName}__card-input`);
  cardCVV.setAttribute('placeholder', 'CVV');
  cardCVV.setAttribute('inputmode', 'numeric');
  cardCVV.setAttribute('required', true);
  cardCVV.addEventListener('keypress', (event) => {
    event.preventDefault();
    let symbol = String.fromCharCode(event.keyCode);

    if (symbol && /^[0-9]+$/.test(symbol) && event.target.value.length < 3) {
      event.target.value += symbol;
    }
  });

  const cardExpiration = document.createElement('input');
  cardExpiration.type = 'month';
  cardExpiration.classList.add(`${baseClassName}__card-input`);
  cardExpiration.setAttribute('placeholder', 'MM / YY');
  cardExpiration.setAttribute('required', true);
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = `${date.getMonth() + 1}`;
  cardExpiration.setAttribute('min', `${currentYear}-${currentMonth.length === 1 ? `0${currentMonth}` : currentMonth}`);

  const cardFormBox = document.createElement('div');
  cardFormBox.classList.add(`${baseClassName}__box`);

  const backToMembershipPlans = document.createElement('button');
  backToMembershipPlans.classList.add(`${baseClassName}__back-to-membership-plans`);
  backToMembershipPlans.addEventListener('click', () => {
    formContainer.classList.remove('transform');
  });

  const cardMembershipBox = document.createElement('div');
  cardMembershipBox.classList.add(`${baseClassName}__membership-box`);

  cardFieldsGroup.appendChild(cardNumber);
  cardFieldsGroup2.appendChild(cardCVV);
  cardFieldsGroup2.appendChild(cardExpiration);
  cardInfoContainer.appendChild(cardFieldsGroup);
  cardInfoContainer.appendChild(cardFieldsGroup2);

  submitButtonContainer.appendChild(submitButton);

  cardMembershipBox.appendChild(
    membershipPlan({
      title: '12 month',
      baseClassName,
      price: 6,
      description: 'BILLED YEARLY IN ONE PAYMENT OF $60',
      formContainer,
    })
  );
  cardMembershipBox.appendChild(
    membershipPlan({
      title: '6 month',
      baseClassName,
      price: 8,
      description: 'BILLED IN ONE INSTALLMENT OF $48',
      formContainer,
    })
  );
  cardMembershipBox.appendChild(
    membershipPlan({
      title: '1 month',
      baseClassName,
      price: 10,
      description: 'RECURRING MONTHLY AT $10',
      formContainer,
    })
  );

  cardFormCard.appendChild(cardInfoContainer);
  cardFormCard.appendChild(submitButtonContainer);
  cardFormBox.appendChild(backToMembershipPlans);
  cardFormBox.appendChild(cardFormCard);
  formContainer.appendChild(cardMembershipBox);
  formContainer.appendChild(cardFormBox);
  form.appendChild(formTitle);
  form.appendChild(formContainer);

  return form;
};
