import catalogueView from "../views/CatalogueView.js";
import overlayView from "../views/overlayView.js";

const overlayEl = document.querySelector(".overlay-body");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
});
