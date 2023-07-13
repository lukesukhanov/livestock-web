import productListController from "../controllers/productListController.js";
import catalogueView from "../views/catalogueView.js";
import filtersView from "../views/filtersView.js";
import overlayView from "../views/overlayView.js";

const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

catalogueEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
  const categoryEl = event.target.closest(
    ".top-frame__left__catalogue-container__catalogue__category"
  );
  if (!categoryEl) return;
  const categoryId = categoryEl.dataset.categoryId;
  productListController.resetFilter();
  productListController.setFilterParam("categoryId", categoryId);
  productListController.refreshFilterParamsInLocation();
  productListController.refreshProductList();
  filtersView.clearFilters();
});
