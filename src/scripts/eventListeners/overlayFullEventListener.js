import loginFormView from "../views/loginFormView.js";
import registrationFormView from "../views/registrationFormView.js";
import overlayView from "../views/overlayView.js";

const overlayEl = document.querySelector(".overlay-full");

/*
 * Hides the full window overlay and the login and registration forms after clicking on that
 *  overlay.
 */
overlayEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeFullOverlay();
  loginFormView.close();
  registrationFormView.close();
});
