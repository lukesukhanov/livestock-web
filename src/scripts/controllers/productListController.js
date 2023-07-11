import productService from "../services/productService.js";
import catalogueView from "../views/catalogueView.js";
import productListView from "../views/productListView.js";
import productListPagesView from "../views/productListPagesView.js";
import filtersView from "../views/filtersView.js";

const filtersPriceFromEl = document.querySelector(".filters__price__inputs__from__input");
const filtersPriceToEl = document.querySelector(".filters__price__inputs__to__input");

class ProductListController {
  #pageable = { page: 1, size: 5 };
  #filter = {};

  clearFilter() {
    this.#filter = {};
  }

  setPage(page) {
    this.#pageable.page = page;
  }

  setPageableToDefault() {
    this.#pageable.page = 1;
    this.#pageable.size = 5;
  }

  setFilterParam(paramName, paramValue) {
    this.#filter[paramName] = paramValue;
  }

  removeFilterParam(paramName) {
    delete this.#filter[paramName];
  }

  async refreshCatalogue() {
    const categories = await productService.getAllCategories();
    catalogueView.refresh(categories);
  }

  actualizeFilters() {
    const minPrice = filtersPriceFromEl.value;
    const maxPrice = filtersPriceToEl.value;
    if (minPrice) {
      this.setFilterParam("minPrice", minPrice);
    } else {
      this.removeFilterParam("minPrice");
    }
    if (maxPrice) {
      this.setFilterParam("maxPrice", maxPrice);
    } else {
      this.removeFilterParam("maxPrice");
    }
  }

  async refreshProductList() {
    const productPage = await productService.getProductsWithPagingAndFiltering(
      this.#pageable,
      this.#filter
    );
    const products = productPage.content;
    products.forEach(product => {
      const imageObjectUrlPromise = productService
        .getIdsOfProductImages(product.id)
        .then(ids => productService.getImageById(ids[0]))
        .then(imageBlob => URL.createObjectURL(imageBlob));
      product.imageObjectUrlPromise = imageObjectUrlPromise;
    });
    productListView.render(products);
    productListPagesView.render(productPage.totalPages, this.#pageable.page);
    filtersView.renderCategory(this.#filter.categoryId);
  }
}

const productListController = new ProductListController();
productListController.refreshProductList();

export default productListController;
