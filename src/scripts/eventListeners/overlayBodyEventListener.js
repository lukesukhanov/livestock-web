import catalogueView from "../views/CatalogueView.js";
import overlayView from "../views/overlayView.js";

const overlayEl = document.querySelector(".overlay-body");

/*
 * Hides the body overlay and the catalogue box after clicking on that overlay.
 */
overlayEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
});
