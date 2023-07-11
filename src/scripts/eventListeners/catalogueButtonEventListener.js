import catalogueView from "../views/CatalogueView.js";

const catalogueButtonEl = document.querySelector(".top-frame__left__catalogue-container__button");

catalogueButtonEl.addEventListener("click", event => {
  event.preventDefault();
  catalogueView.toggle();
});
