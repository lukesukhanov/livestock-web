import productListController from "../controllers/productListController.js";

const searchInputEl = document.querySelector(".top-frame__search-bar__bar");

searchInputEl.addEventListener("keydown", event => {
  event.preventDefault();
  if (event.key === "Enter") {
    const search = searchInputEl.value;
    productListController.clearFilter();
    if (search) productListController.setFilterParam("search", search);
    productListController.refreshProductList();
  }
});
