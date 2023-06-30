const productListPagesEl = document.querySelector(".product-list__pages");

class ProductListPagesView {
  render(totalPages, currentPage) {
    const newPages = [];
    for (let pageOrdinal = 1; pageOrdinal <= totalPages; pageOrdinal++) {
      const pageEl = document.createElement("div");
      pageEl.classList.add("product-list__pages__page");
      if (pageOrdinal === currentPage) pageEl.classList.add("current");
      pageEl.setAttribute("data-page-ordinal", pageOrdinal);
      pageEl.innerText = pageOrdinal;
      newPages.push(pageEl);
    }
    productListPagesEl.replaceChildren(...newPages);
  }
}

export default new ProductListPagesView();
