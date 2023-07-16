import cartService from "../services/cartService.js";
import userController from "./userController.js";
import productService from "../services/productService.js";
import cartProductListView from "../views/cartProductListView.js";
import productListPagesView from "../views/productListPagesView.js";

const filterParams = ["page", "size"];

/*
 * Methods for managing the product cart.
 */
class CartController {
  #filter = { page: 0, size: 5 };

  /*
   * Sets default values for the filter.
   */
  resetFilter() {
    this.#filter = {};
    this.#filter.page = 0;
    this.#filter.size = 5;
  }

  setFilterParam(paramName, paramValue) {
    this.#filter[paramName] = paramValue;
  }

  removeFilterParam(paramName) {
    delete this.#filter[paramName];
  }

  /*
   * Adds params from the current location's query into the filter.
   */
  parseFilterParamsFromLocation() {
    const query = new URLSearchParams(window.location.search);
    for (let paramName of filterParams) {
      const paramValue = query.get(paramName);
      if (paramValue) this.setFilterParam(paramName, paramValue);
    }
  }

  /*
   * Sets params from the filter to the current location's query.
   */
  #refreshFilterParamsInLocation() {
    const params = new URLSearchParams();
    Object.keys(this.#filter).forEach(paramName =>
      params.append(paramName, this.#filter[paramName])
    );
    const url = window.location.origin + window.location.pathname + "?" + params;
    window.history.pushState({ path: url }, null, url);
  }

  /*
   * Gets products from the user's cart using the filter.
   * Shows the found products on the cart page.
   *
   * This method is ugly and should be refactored.
   */
  async refreshCartProductsList() {
    cartProductListView.clearProducts();
    this.#refreshFilterParamsInLocation();
    const userEmail = JSON.parse(window.sessionStorage.getItem("livestockIdToken"))?.sub;
    if (!userEmail) {
      userController.clearAuthentication();
      cartProductListView.renderEmptyCart();
      this.resetFilter();
      return;
    }
    const accessToken = window.sessionStorage.getItem("livestockAccessToken");
    const productsInCartPage = await cartService.getProductsFromCartWithPagingAndFiltering(
      this.#filter,
      userEmail,
      accessToken
    );
    if (!productsInCartPage) {
      userController.clearAuthentication();
      cartProductListView.renderEmptyCart();
      this.resetFilter();
      return;
    }
    const products = productsInCartPage.content;
    if (!products.length) {
      if (this.#filter.page === 0) cartProductListView.renderEmptyCart();
      else window.location = window.location.origin + "/cart.html";
      return;
    }
    cartProductListView.renderCartProductListContainer();
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
        if (!userEmail) {
          userController.clearAuthentication();
          cartProductListView.close();
          return;
        }
        const accessToken = window.sessionStorage.getItem("livestockAccessToken");
        if (!accessToken) {
          userController.clearAuthentication();
          cartProductListView.close();
          return;
        }
        const responseStatus = await cartService.removeProductFromCart(
          product.productId,
          userEmail,
          accessToken
        );
        if (responseStatus !== 204) {
          userController.clearAuthentication();
          cartProductListView.close();
          return;
        }
        cartProductListView.removeProduct(productEl);
      });
    });
    productListPagesView.render(productsInCartPage.totalPages, Number(this.#filter.page) + 1);
  }

  /*
   * Removes all products from the user's cart.
   * Shows the empty cart on the cart page.
   */
  async removeAllProductsFromCart() {
    const userEmail = JSON.parse(window.sessionStorage.getItem("livestockIdToken"))?.sub;
    if (!userEmail) {
      userController.clearAuthentication();
      cartProductListView.clearProducts();
      return;
    }
    const accessToken = window.sessionStorage.getItem("livestockAccessToken");
    if (!accessToken) {
      userController.clearAuthentication();
      cartProductListView.clearProducts();
      return;
    }
    const responseStatus = await cartService.removeAllProductsFromCart(userEmail, accessToken);
    if (responseStatus !== 204) userController.clearAuthentication();
    cartProductListView.renderEmptyCart();
  }
}

export default new CartController();
