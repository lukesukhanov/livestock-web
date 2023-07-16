import productListController from "../controllers/productListController.js";

const maxPriceInputEl = document.querySelector(".filters__price__inputs__max-price__input");

/*
 * Applies 'max price' filter after pressing 'Enter' on the 'max price' input.
 */
maxPriceInputEl.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  productListController.resetPageAndSizeInFilter();
  const maxPrice = maxPriceInputEl.value;
  if (maxPrice) {
    productListController.setFilterParam("maxPrice", maxPrice);
  } else {
    productListController.removeFilterParam("maxPrice");
  }
  productListController.refreshProductList();
});
