import productListController from "../controllers/productListController.js";
import filtersView from "../views/filtersView.js";

const searchInputEl = document.querySelector(".top-frame__search-bar__bar");

searchInputEl.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    const search = searchInputEl.value;
    filtersView.clearFilters();
    productListController.setPageableToDefault();
    productListController.clearFilter();
    if (search) productListController.setFilterParam("search", search);
    productListController.refreshProductList();
  }
});
