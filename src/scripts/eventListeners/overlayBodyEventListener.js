import catalogueView from "../views/CatalogueView.js";

const overlayEl = document.querySelector(".overlay-body");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  catalogueView.close();
});