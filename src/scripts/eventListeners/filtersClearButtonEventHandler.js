import filtersView from "../views/filtersView.js";
import productListController from "../controllers/productListController.js";

const filtersClearButtonEl = document.querySelector(".filters__buttons__clear-button");

/*
 * Clears values of filter inputs on the left side of the page after clicking on the 'clear'
 * button.
 */
filtersClearButtonEl.addEventListener("click", event => {
  event.preventDefault();
  filtersView.clearFilters();
  productListController.parseFilterParamsFromInputs();
});
