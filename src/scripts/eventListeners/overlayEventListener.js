import catalogueView from "../views/CatalogueView.js";

const overlayEl = document.querySelector(".overlay");

overlayEl.addEventListener("click", event => {
  event.preventDefault();
  if (overlayEl.classList.contains("active")) catalogueView.close();
});
