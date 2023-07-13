import cartService from "../services/cartService.js";
import userController from "./userController.js";
import productService from "../services/productService.js";
import cartProductListView from "../views/cartProductListView.js";
import productListPagesView from "../views/productListPagesView.js";

const filterParams = ["page", "size"];

class CartController {
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

  async refreshCartProductsList() {
    this.#refreshFilterParamsInLocation();
    const userEmail = JSON.parse(window.sessionStorage.getItem("livestockIdToken"))?.sub;
    if (!userEmail) return;
    const accessToken = window.sessionStorage.getItem("livestockAccessToken");
    const productsInCartPage = await cartService.getProductsFromCartWithPagingAndFiltering(
      this.#filter,
      userEmail,
      accessToken
    );
    if (!productsInCartPage) {
      userController.clearAuthentication();
      cartProductListView.close();
      return;
    }
    const products = productsInCartPage.content;
    cartProductListView.clearProducts();
    products.forEach(product => {
      const imageObjectUrlPromise = productService
        .getIdsOfProductImages(product.productId)
        .then(ids => productService.getImageById(ids[0]))
        .then(imageBlob => URL.createObjectURL(imageBlob));
      product.imageObjectUrlPromise = imageObjectUrlPromise;
      const productEl = cartProductListView.appendProduct(product);
      const removeButtonEl = productEl.querySelector(".cart-product-list__product__remove-button");
      removeButtonEl.addEventListener("click", async function (event) {
        event.preventDefault();
        const userEmail = JSON.parse(window.sessionStorage.getItem("livestockIdToken"))?.sub;
        if (!userEmail) return;
        const accessToken = window.sessionStorage.getItem("livestockAccessToken");
        const responseStatus = await cartService.removeProductFromCart(
          product.productId,
          userEmail,
          accessToken
        );
        if (responseStatus !== 204) return;
        cartProductListView.removeProduct(productEl);
      });
    });
    if (products.length)
      productListPagesView.render(productsInCartPage.totalPages, Number(this.#filter.page) + 1);
  }
}

export default new CartController();
