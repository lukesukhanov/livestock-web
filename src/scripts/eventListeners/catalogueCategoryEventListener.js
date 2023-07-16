import productListController from "../controllers/productListController.js";
import catalogueView from "../views/catalogueView.js";
import filtersView from "../views/filtersView.js";
import overlayView from "../views/overlayView.js";

const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

/*
 * Shows the products of the required category in the product list after clicking on the category
 * in the catalogue box.
 */
catalogueEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
  const categoryEl = event.target.closest(
    ".top-frame__left__catalogue-container__catalogue__category"
  );
  if (!categoryEl) return;
  const categoryId = categoryEl.dataset.categoryId;
  window.location = window.location.origin + `?page=0&size=5&categoryId=${categoryId}`;
});
