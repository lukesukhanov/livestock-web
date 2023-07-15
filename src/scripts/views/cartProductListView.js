import imageView from "./imageView.js";

const cartProductListContainerEl = document.querySelector(".cart-product-list-container");
const cartProductListEl = document.querySelector(".cart-product-list");
const emptyCartTitleEl = document.querySelector(".empty-cart-title");

/*
 * Methods for rendering products in a cart.
 */
class CartProductListView {
  /*
   * Adds a new product into the cart.
   */
  appendProduct(product) {
    const productEl = document.createElement("div");
    productEl.classList.add("cart-product-list__product");
    productEl.setAttribute("data-product-id", product.id);
    const imageEl = document.createElement("img");
    imageEl.classList.add("cart-product-list__product__image");
    productEl.insertAdjacentElement("afterbegin", imageEl);
    imageView.render(imageEl, product.imageObjectUrlPromise);
    productEl.insertAdjacentHTML(
      "beforeend",
      `
          <div class="cart-product-list__product__info">
            <div class="cart-product-list__product__info__name">${product.productName}</div>
            <div class="cart-product-list__product__info__price">
              <span class="cart-product-list__product__info__price__value">${product.price}</span>
              <span class="cart-product-list__product__info__price__currency">₽</span>
            </div>
            <div class="cart-product-list__product__info__quantity">
              <span class="cart-product-list__product__info__quantity__label">Количество: </span>
              <span class="cart-product-list__product__info__quantity__value">${product.quantity}</span>
            </div>
          </div>
          <button class="cart-product-list__product__remove-button">Удалить</button>
        `
    );
    cartProductListEl.insertAdjacentElement("beforeend", productEl);
    return productEl;
  }

  /*
   * Removes all products from the cart.
   */
  clearProducts() {
    cartProductListEl.innerHTML = null;
  }

  /*
   * Renders a cart.
   */
  renderCartProductListContainer() {
    cartProductListContainerEl.classList.add("active");
    emptyCartTitleEl.classList.remove("active");
  }

  /*
   * Renders an empty cart.
   */
  renderEmptyCart() {
    cartProductListContainerEl.classList.remove("active");
    emptyCartTitleEl.classList.add("active");
  }

  /*
   * Removes a single product from the cart.
   */
  removeProduct(productEl) {
    productEl.remove();
  }

  /*
   * Renders a cart.
   */
  closeCartProductListContainer() {
    cartProductListContainerEl.classList.remove("active");
  }
}

export default new CartProductListView();
