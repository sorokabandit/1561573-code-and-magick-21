'use strict';
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupWizard = document.querySelector(`.setup-wizard`);
const wizardfireball = document.querySelector(`.setup-fireball-wrap`);
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const wizardcoat = setupWizard.querySelector(`.wizard-coat`);
const wizardeyes = setupWizard.querySelector(`.wizard-eyes`);
const inputColorEyes = setup.querySelector(`input[name="eyes-color"]`);
const inputColorCoat = setup.querySelector(`input[name="coat-color"]`);
const inputColorFireball = setup.querySelector(`input[name="fireball-color"]`);
const userName = document.querySelector(`.setup-user-name`);
let nameFocus = false;


const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};


setupOpen.addEventListener(`click`, function () {
  openPopup();
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape` && !nameFocus) {
    evt.preventDefault();
    closePopup();
  }
});


setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});
// при наведении на форму имени esc не срабатывает
userName.addEventListener(`focus`, function () {
  nameFocus = true;
});

userName.addEventListener(`blur`, function () {
  nameFocus = false;
});


const userNameInput = document.querySelector(`.setup-user-name`);
userNameInput.addEventListener(`input`, function () {
  let valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
  userNameInput.reportValidity();
});


const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);


document.querySelector(`.setup-similar`).classList.remove(`hidden`);

function getWizards(n) {
  let wizards = [];
  for (let index = 0; index < n; index++) {
    let wizard = {};
    wizard.name = getRandomArrayItem(WIZARD_NAMES) + getRandomArrayItem(WIZARD_SURNAMES);
    wizard.coatColor = getRandomArrayItem(COAT_COLORS);
    wizard.eyesColor = getRandomArrayItem(EYES_COLOR);
    wizards.push(wizard);
  }
  return wizards;
}
const WIZARD_NAMES = [`Иван `, `Хуан Себастьян `, `Мария `, `Кристоф `, `Виктор `, `Юлия `, `Лопита `, `Вашингтон `];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топльницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLOR = [`red`, `blue`, `yellow`, `green`, `black`];
const FIRE_BALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const getRandomArrayItem = function (array) {
  let item = array[Math.floor(Math.random() * array.length)];
  return item;
};
const wizards = getWizards(4);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

for (let i = 0; i < wizards.length; i++) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizards[i].name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizards[i].coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizards[i].eyesColor;
  similarListElement.appendChild(wizardElement);
}

let getColorFix = function (element, colors, input) {
  element.addEventListener(`click`, function () {
    let elementColor = getRandomArrayItem(colors);
    element.style.fill = elementColor;
    input.value = elementColor;
  });
};
getColorFix(wizardeyes, EYES_COLOR, inputColorEyes);
getColorFix(wizardcoat, COAT_COLORS, inputColorCoat);

wizardfireball.addEventListener(`click`, function () {
  let fireballColor = getRandomArrayItem(FIRE_BALL);
  wizardfireball.style.background = fireballColor;
  inputColorFireball.value = fireballColor;
});
