import productListController from "../controllers/productListController.js";

const pagesEl = document.querySelector(".product-list__pages");

pagesEl.addEventListener("click", event => {
  event.preventDefault();
  const pageEl = event.target.closest(".product-list__pages__page");
  if (pageEl.classList.contains("current")) return;
  const page = Number(pageEl.dataset.pageOrdinal);
  productListController.setPage(page);
  productListController.refreshProductList();
});
