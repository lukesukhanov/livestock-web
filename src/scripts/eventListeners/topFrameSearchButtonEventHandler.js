import productListController from "../controllers/productListController.js";

const searchButtonEl = document.querySelector(".top-frame__search-bar__button");
const searchInputEl = document.querySelector(".top-frame__search-bar__bar");

searchButtonEl.addEventListener("click", event => {
  event.preventDefault();
  const search = searchInputEl.value;
  productListController.clearFilter();
  if (search) productListController.setFilterParam("search", search);
  productListController.refreshProductList();
});
