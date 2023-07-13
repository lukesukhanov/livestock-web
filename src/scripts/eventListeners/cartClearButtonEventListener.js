import cartController from "../controllers/cartController.js";

const clearButtonEl = document.querySelector(".cart-product-list__clear-button");

clearButtonEl.addEventListener("click", event => {
  event.preventDefault();
  cartController.removeAllProductsFromCart();
});
