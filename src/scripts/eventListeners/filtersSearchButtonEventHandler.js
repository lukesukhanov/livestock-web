import productListController from "../controllers/productListController.js";

const filtersSearchButtonEl = document.querySelector(".filters__search-button");

filtersSearchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  productListController.actualizeFilters();
  productListController.refreshProductList();
});
