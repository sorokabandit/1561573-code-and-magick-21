'use strict';

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);


document.querySelector(`.setup-similar`).classList.remove(`hidden`);


const WIZARD_NAMES = [`Иван `, `Хуан Себастьян `, `Мария `, `Кристоф `, `Виктор `, `Юлия `, `Лопита `, `Вашингтон `];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топльницкая`, `Нионго`, `Ирвинг`];
const getRandomArrayItem = function (array) {
  let item = array[Math.floor(Math.random() * array.length)];
  return item;
};


const wizards = [
  {
    name: getRandomArrayItem(WIZARD_NAMES) + getRandomArrayItem(WIZARD_SURNAMES),
    coatColor: `rgb(101, 137, 164)`,
    eyesColor: `red`
  },
  {
    name: getRandomArrayItem(WIZARD_NAMES) + getRandomArrayItem(WIZARD_SURNAMES),
    coatColor: `rgb(241, 43, 107)`,
    eyesColor: `blue`
  },
  {
    name: getRandomArrayItem(WIZARD_NAMES) + getRandomArrayItem(WIZARD_SURNAMES),
    coatColor: `rgb(146, 100, 161)`,
    eyesColor: `yellow`
  },
  {
    name: getRandomArrayItem(WIZARD_NAMES) + getRandomArrayItem(WIZARD_SURNAMES),
    coatColor: `rgb(56, 159, 117)`,
    eyesColor: `green`
  }
];

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

for (let i = 0; i < wizards.length; i++) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizards[i].name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizards[i].coatColor;
  similarListElement.appendChild(wizardElement);
}




