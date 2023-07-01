import productListController from "../controllers/productListController.js";

const filtersPriceToEl = document.querySelector(".filters__price__inputs__to__input");

filtersPriceToEl.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  const maxPrice = filtersPriceToEl.value;
  if (maxPrice) {
    productListController.setFilterParam("maxPrice", maxPrice);
  } else {
    productListController.removeFilterParam("maxPrice");
  }
  productListController.refreshProductList();
});
