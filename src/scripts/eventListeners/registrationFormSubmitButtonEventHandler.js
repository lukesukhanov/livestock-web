import userController from "../controllers/userController.js";
import registrationFormView from "../views/registrationFormView.js";

const submitButtonEl = document.querySelector(".registration-form__button");
const registrationFormEl = document.querySelector(".registration-form");
const firstNameInputEl = registrationFormEl.elements["first-name"];
const lastNameInputEl = registrationFormEl.elements["last-name"];
const emailInputEl = registrationFormEl.elements["email"];
const passwordInputEl = registrationFormEl.elements["password"];
const repeatedPasswordInputEl = registrationFormEl.elements["repeated-password"];

/*
 * Validates form inputs, submits and hides registration form or marks incorrect inputs after
 * clicking on the 'submit' button of the registration form.
 */
submitButtonEl.addEventListener("click", event => {
  event.preventDefault();
  registrationFormView.clearErrors();
  const firstName = firstNameInputEl.value.trim();
  const lastName = lastNameInputEl.value.trim();
  const email = emailInputEl.value.trim().toLowerCase();
  const password = passwordInputEl.value;
  const repeatedPassword = repeatedPasswordInputEl.value;
  const errors = validateInputs(firstName, lastName, email, password, repeatedPassword);
  if (errors.size) {
    registrationFormView.renderErrors(errors);
    return;
  }
  userController.register(firstName, lastName, email, password, repeatedPassword);
  registrationFormView.close();
});

const validateInputs = function (firstName, lastName, email, password, repeatedPassword) {
  let errors = new Set();
  if (!firstName) errors.add("first-name");
  if (!lastName) errors.add("last-name");
  if (!email || !email.match(/^[^@]+@[^@]+$/g)) errors.add("email");
  if (!password) errors.add("password");
  if (!repeatedPassword || repeatedPassword !== password) errors.add("repeated-password");
  return errors;
};
