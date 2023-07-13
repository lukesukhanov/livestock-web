import productService from "../services/productService.js";
import cartService from "../services/cartService.js";
import catalogueView from "../views/catalogueView.js";
import productListView from "../views/productListView.js";
import productListPagesView from "../views/productListPagesView.js";
import filtersView from "../views/filtersView.js";

const minPriceInputEl = document.querySelector(".filters__price__inputs__min-price__input");
const maxPriceInputEl = document.querySelector(".filters__price__inputs__max-price__input");

const filterParams = ["page", "size", "search", "categoryId", "minPrice", "maxPrice"];

class ProductListController {
  #filter = { page: 0, size: 5 };

  resetFilter() {
    this.#filter = {};
    this.#filter.page = 0;
    this.#filter.size = 5;
  }

  resetPageAndSizeInFilter() {
    this.#filter.page = 0;
    this.#filter.size = 5;
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

  parseFilterParamsFromInputs() {
    const minPrice = minPriceInputEl.value;
    const maxPrice = maxPriceInputEl.value;
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

  parseFilterParamsFromLocation() {
    const query = new URLSearchParams(window.location.search);
    for (let paramName of filterParams) {
      const paramValue = query.get(paramName);
      if (paramValue) this.setFilterParam(paramName, paramValue);
    }
  }

  #refreshFilterParamsInLocation() {
    const params = new URLSearchParams();
    Object.keys(this.#filter).forEach(paramName =>
      params.append(paramName, this.#filter[paramName])
    );
    const url = window.location.origin + window.location.pathname + "?" + params;
    window.history.pushState({ path: url }, null, url);
  }

  async refreshProductList() {
    this.#refreshFilterParamsInLocation();
    const productPage = await productService.getProductsWithPagingAndFiltering(this.#filter);
    const products = productPage.content;
    productListView.clearProducts();
    productListView.renderProductListContainer();
    products.forEach(product => {
      const imageObjectUrlPromise = productService
        .getIdsOfProductImages(product.id)
        .then(ids => productService.getImageById(ids[0]))
        .then(imageBlob => URL.createObjectURL(imageBlob));
      product.imageObjectUrlPromise = imageObjectUrlPromise;
      const productEl = productListView.appendProduct(product);
      const cartButtonEl = productEl.querySelector(".product-list__product__cart-button");
      cartButtonEl.addEventListener("click", event => {
        event.preventDefault();
        const userEmail = JSON.parse(window.sessionStorage.getItem("livestockIdToken"))?.sub;
        if (!userEmail) return;
        const accessToken = window.sessionStorage.getItem("livestockAccessToken");
        cartService.addProductToCart(userEmail, product.id, 1, accessToken);
      });
      productListPagesView.render(productPage.totalPages, Number(this.#filter.page) + 1);
      filtersView.renderCategory(this.#filter.categoryId);
    });
  }
}

export default new ProductListController();
