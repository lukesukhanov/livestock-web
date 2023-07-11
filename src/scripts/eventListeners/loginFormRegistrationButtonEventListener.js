import registrationFormView from "../views/registrationFormView.js";

const registrationButtonEl = document.querySelector(".login-form-box__registration__button");

registrationButtonEl.addEventListener("click", event => {
  event.preventDefault();
  registrationFormView.render();
});
