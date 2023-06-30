import productListController from "../controllers/productListController.js";
import catalogueView from "../views/catalogueView.js";

const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

catalogueEl.addEventListener("click", event => {
  event.preventDefault();
  catalogueView.close();
  const categoryEl = event.target.closest(
    ".top-frame__left__catalogue-container__catalogue__category"
  );
  if (!categoryEl) return;
  const categoryId = categoryEl.dataset.categoryId;
  productListController.clearFilter();
  productListController.setPage(1);
  productListController.setFilterParam("categoryId", categoryId);
  productListController.refreshProductList();
});
