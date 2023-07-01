import productListController from "../controllers/productListController.js";

const filtersSearchButtonEl = document.querySelector(".filters__search-button");
const filtersPriceFromEl = document.querySelector(".filters__price__inputs__from__input");
const filtersPriceToEl = document.querySelector(".filters__price__inputs__to__input");

filtersSearchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  const minPrice = filtersPriceFromEl.value;
  const maxPrice = filtersPriceToEl.value;
  if (minPrice) {
    productListController.setFilterParam("minPrice", minPrice);
  } else {
    productListController.removeFilterParam("minPrice");
  }
  if (maxPrice) {
    productListController.setFilterParam("maxPrice", maxPrice);
  } else {
    productListController.removeFilterParam("maxPrice");
  }
  productListController.refreshProductList();
});
