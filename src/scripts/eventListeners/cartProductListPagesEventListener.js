import cartController from "../controllers/cartController.js";

const pagesEl = document.querySelector(".product-list__pages");

/*
 * Shows the required page with the products from the cart after clicking on the page ordinal on
 * the '/cart' page.
 */
pagesEl.addEventListener("click", event => {
  event.preventDefault();
  const pageEl = event.target.closest(".product-list__pages__page");
  if (pageEl.classList.contains("current")) return;
  const page = Number(pageEl.dataset.pageOrdinal);
  cartController.setFilterParam("page", page - 1);
  cartController.refreshCartProductsList();
});
