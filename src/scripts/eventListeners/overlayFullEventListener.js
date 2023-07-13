import loginFormView from "../views/loginFormView.js";
import registrationFormView from "../views/registrationFormView.js";
import overlayView from "../views/overlayView.js";

const overlayEl = document.querySelector(".overlay-full");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeFullOverlay();
  loginFormView.close();
  registrationFormView.close();
});
