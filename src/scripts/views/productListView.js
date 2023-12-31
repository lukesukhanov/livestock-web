import imageView from "./imageView.js";

const productListEl = document.querySelector(".product-list");

/*
 * Methods for rendering a product list.
 */
class ProductListView {
  /*
   * Removes all products from the product list.
   */
  clearProducts() {
    productListEl.innerHTML = "";
  }

  /*
   * Adds a new product into the product list.
   */
  appendProduct(product) {
    const productEl = document.createElement("div");
    productEl.classList.add("product-list__product");
    productEl.setAttribute("data-product-id", product.id);
    const imageEl = document.createElement("img");
    imageEl.classList.add("product-list__product__image");
    productEl.insertAdjacentElement("afterbegin", imageEl);
    imageView.render(imageEl, product.imageObjectUrlPromise);
    productEl.insertAdjacentHTML(
      "beforeend",
      `
          <div class="product-list__product__info">
            <div class="product-list__product__info__name">${product.productName}</div>
            <div class="product-list__product__info__price">
              <span class="product-list__product__info__price__value">${product.price}</span>
              <span class="product-list__product__info__price__currency">₽</span>
            </div>
            <div class="product-list__product__info__quantity">
              <span class="product-list__product__info__quantity__label">В наличии: </span>
              <span class="product-list__product__info__quantity__value">${product.quantity}</span>
            </div>
            <div class="product-list__product__info__description">${product.description}</div>
          </div>
          <button class="product-list__product__cart-button">В корзину</button>
        `
    );
    productListEl.insertAdjacentElement("beforeend", productEl);
    return productEl;
  }
}

export default new ProductListView();
