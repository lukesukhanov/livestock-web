import loginFormView from "../views/loginFormView.js";
import userController from "../controllers/userController.js";

const loginFormEl = document.querySelector(".login-form-box__login-form");
const submitButtonEl = document.querySelector(".login-form-box__login-form__button");
const emailInputEl = loginFormEl.elements["email"];
const passwordInputEl = loginFormEl.elements["password"];

submitButtonEl.addEventListener("click", event => {
  event.preventDefault();
  loginFormView.clearErrors();
  const email = emailInputEl.value.trim();
  const password = passwordInputEl.value;
  const errors = validateInputs(email, password);
  if (errors.size) {
    loginFormView.renderErrors(errors);
    return;
  }
  userController.fetchAuthorizationCodeFromLivestock(email, password);
  loginFormView.close();
});

const validateInputs = function (email, password) {
  let errors = new Set();
  if (!email || !email.match(/^[^@]+@[^@]+$/g)) errors.add("email");
  if (!password) errors.add("password");
  return errors;
};
