import productListController from "../controllers/productListController.js";
import filtersView from "../views/filtersView.js";
import catalogueView from "../views/catalogueView.js";
import overlayView from "../views/overlayView.js";

const searchButtonEl = document.querySelector(".top-frame__search-bar__button");
const searchInputEl = document.querySelector(".top-frame__search-bar__bar");

searchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  overlayView.closeBodyOverlay();
  catalogueView.close();
  const search = searchInputEl.value;
  productListController.resetFilter();
  if (search) productListController.setFilterParam("search", search);
  productListController.refreshFilterParamsInLocation();
  productListController.refreshProductList();
  filtersView.clearFilters();
});
