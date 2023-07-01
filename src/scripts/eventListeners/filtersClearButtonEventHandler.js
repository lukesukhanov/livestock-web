import filtersView from "../views/filtersView.js";

const filtersClearButtonEl = document.querySelector(".filters__buttons__clear-button");

filtersClearButtonEl.addEventListener("click", event => {
  event.preventDefault();
  filtersView.clearFilters();
});