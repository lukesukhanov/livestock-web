import catalogueView from "../views/catalogueView.js";
import overlayView from "../views/overlayView.js";

const catalogueButtonEl = document.querySelector(".top-frame__left__catalogue-container__button");

catalogueButtonEl.addEventListener("click", event => {
  event.preventDefault();
  catalogueView.toggle();
  overlayView.toggleBodyOverlay();
});
