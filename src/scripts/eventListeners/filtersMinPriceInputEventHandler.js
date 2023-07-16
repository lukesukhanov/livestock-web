import productListController from "../controllers/productListController.js";

const minPriceInputEl = document.querySelector(".filters__price__inputs__min-price__input");

/*
 * Applies 'min price' filter after pressing 'Enter' on the 'min price' input.
 */
minPriceInputEl.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  productListController.resetPageAndSizeInFilter();
  const minPrice = minPriceInputEl.value;
  if (minPrice) {
    productListController.setFilterParam("minPrice", minPrice);
  } else {
    productListController.removeFilterParam("minPrice");
  }
  productListController.refreshProductList();
});
