import cartController from "../controllers/cartController.js";

const clearButtonEl = document.querySelector(".cart-product-list__clear-button");

/*
 * Removes all products from the user's cart after clicking on the 'clear' button on the cart page.
 */
clearButtonEl.addEventListener("click", event => {
  event.preventDefault();
  cartController.removeAllProductsFromCart();
});
