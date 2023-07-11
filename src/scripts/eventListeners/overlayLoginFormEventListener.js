import loginFormView from "../views/loginFormView.js";

const overlayEl = document.querySelector(".overlay-login-form");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  loginFormView.close();
});
