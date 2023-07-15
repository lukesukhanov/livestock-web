import catalogueView from "../views/catalogueView.js";
import overlayView from "../views/overlayView.js";

const catalogueButtonEl = document.querySelector(".top-frame__left__catalogue-container__button");

/*
 * Shows the catalogue box with the product categories after clicking on the 'catalogue' button
 * on the top frame.
 */
catalogueButtonEl.addEventListener("click", event => {
  event.preventDefault();
  catalogueView.toggle();
  overlayView.toggleBodyOverlay();
});
