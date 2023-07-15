import productListController from "../controllers/productListController.js";

const pagesEl = document.querySelector(".product-list__pages");

/*
 * Shows the required page with the products in the product list after clicking on the page ordinal
 * on the page with filters.
 */
pagesEl.addEventListener("click", event => {
  event.preventDefault();
  const pageEl = event.target.closest(".product-list__pages__page");
  if (pageEl.classList.contains("current")) return;
  const page = Number(pageEl.dataset.pageOrdinal);
  productListController.setFilterParam("page", page - 1);
  productListController.refreshProductList();
});
