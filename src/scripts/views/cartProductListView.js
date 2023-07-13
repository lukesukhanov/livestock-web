import imageView from "./imageView.js";

const cartProductListEl = document.querySelector(".cart-product-list");

class CartProductListView {
  clearProducts() {
    cartProductListEl.innerHTML = "";
  }

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

  removeProduct(productEl) {
    productEl.remove();
  }

  close() {
    cartProductListEl.innerHTML = null;
  }
}

export default new CartProductListView();
