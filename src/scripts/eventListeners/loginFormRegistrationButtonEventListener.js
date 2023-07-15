import loginFormView from "../views/loginFormView.js";
import registrationFormView from "../views/registrationFormView.js";

const registrationButtonEl = document.querySelector(".login-form-box__registration__button");

/*
 * Hides login form and shows registration form afer clicking on the 'registration' button of the
 * login form.
 */
registrationButtonEl.addEventListener("click", event => {
  event.preventDefault();
  loginFormView.close();
  registrationFormView.render();
});
