import loginFormView from "../views/loginFormView.js";
import overlayView from "../views/overlayView.js";
import catalogueView from "../views/catalogueView.js";

const userIconEl = document.querySelector(".top-frame__right__user");

userIconEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
  loginFormView.render();
  overlayView.renderFullOverlay();
});
