import productListController from "../controllers/productListController.js";

const filtersSearchButtonEl = document.querySelector(".filters__buttons__search-button");

/*
 * Applies filters after clicking on the 'search' button in the filter box on the left side of the
 * page.
 */
filtersSearchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  productListController.resetPageAndSizeInFilter();
  productListController.parseFilterParamsFromInputs();
  productListController.refreshProductList();
});
