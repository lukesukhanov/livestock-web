const productListPagesEl = document.querySelector(".product-list__pages");

class ProductListPagesView {
  render(totalPages, currentPage) {
    this.#clear();
    for (let pageOrdinal = 1; pageOrdinal <= totalPages; pageOrdinal++) {
      const pageEl = document.createElement("div");
      pageEl.classList.add("product-list__pages__page");
      if (pageOrdinal === currentPage) pageEl.classList.add("current");
      pageEl.setAttribute("data-page-ordinal", pageOrdinal);
      pageEl.innerText = pageOrdinal;
      productListPagesEl.insertAdjacentElement("beforeend", pageEl);
    }
  }

  #clear() {
    productListPagesEl.innerHTML = "";
  }
}

export default new ProductListPagesView();
