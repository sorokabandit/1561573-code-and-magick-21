'use strict';
(function () {
  const setup = document.querySelector(`.setup`);
  const setupWizard = document.querySelector(`.setup-wizard`);
  const wizardfireball = document.querySelector(`.setup-fireball-wrap`);
  const wizardcoat = setupWizard.querySelector(`.wizard-coat`);
  const wizardeyes = setupWizard.querySelector(`.wizard-eyes`);
  const inputColorEyes = setup.querySelector(`input[name="eyes-color"]`);
  const inputColorCoat = setup.querySelector(`input[name="coat-color"]`);
  const inputColorFireball = setup.querySelector(`input[name="fireball-color"]`);
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLOR = [`red`, `blue`, `yellow`, `green`, `black`];
  const FIRE_BALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const getRandomArrayItem = function (array) {
    let item = array[Math.floor(Math.random() * array.length)];
    return item;
  };
  // волшебники
  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);


  const similarListElement = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
  const sucsessHandler = function (data) {
    let wizards = data;
    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      let wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector(`.setup-similar-label`).textContent = wizards[i].name;
      wizardElement.querySelector(`.wizard-coat`).style.fill = wizards[i].colorCoat;
      wizardElement.querySelector(`.wizard-eyes`).style.fill = wizards[i].colorEyes;
      similarListElement.appendChild(wizardElement);
    }
  };
  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.backend.load(sucsessHandler, errorHandler);

  const form = userDialog.querySelector(`.setup-wizard-form`);
  form.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add(`hidden`);
    });
    evt.preventDefault();
  });


  // изменение цвета глаз и плаща
  const getColorFix = function (element, colors, input) {
    element.addEventListener(`click`, function () {
      let elementColor = getRandomArrayItem(colors);
      element.style.fill = elementColor;
      input.value = elementColor;
    });
  };
  getColorFix(wizardeyes, EYES_COLOR, inputColorEyes);
  getColorFix(wizardcoat, COAT_COLORS, inputColorCoat);

  // цвет фаербола

  wizardfireball.addEventListener(`click`, function () {
    const fireballColor = getRandomArrayItem(FIRE_BALL);
    wizardfireball.style.background = fireballColor;
    inputColorFireball.value = fireballColor;
  });
})();
