import productListController from "../controllers/productListController.js";
import filtersView from "../views/filtersView.js";
import catalogueView from "../views/catalogueView.js";
import overlayView from "../views/overlayView.js";

const searchInputEl = document.querySelector(".top-frame__search-bar__bar");

/*
 * Shows the found products in the product list after pressing "Enter" on the search input on the
 * top frame.
 */
searchInputEl.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    overlayView.closeBodyOverlay();
    catalogueView.close();
    const search = searchInputEl.value;
    productListController.resetFilter();
    if (search) window.location = window.location.origin + `?page=0&size=5&search=${search}`;
  }
});
