import productListController from "../controllers/productListController.js";

const filtersSearchButtonEl = document.querySelector(".filters__buttons__search-button");

filtersSearchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  productListController.setPageableToDefault();
  productListController.actualizeFilters();
  productListController.refreshProductList();
});
