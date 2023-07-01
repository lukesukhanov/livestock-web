import productListController from "../controllers/productListController.js";

const filtersPriceFromEl = document.querySelector(".filters__price__inputs__from__input");

filtersPriceFromEl.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  productListController.setPageableToDefault();
  const minPrice = filtersPriceFromEl.value;
  if (minPrice) {
    productListController.setFilterParam("minPrice", minPrice);
  } else {
    productListController.removeFilterParam("minPrice");
  }
  productListController.refreshProductList();
});
