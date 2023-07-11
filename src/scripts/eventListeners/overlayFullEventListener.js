import loginFormView from "../views/loginFormView.js";
import registrationFormView from "../views/registrationFormView.js";

const overlayEl = document.querySelector(".overlay-full");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  loginFormView.close();
  registrationFormView.close();
});
