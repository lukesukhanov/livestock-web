const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

class CatalogueView {
  render() {
    catalogueEl.classList.add("active");
  }

  close() {
    catalogueEl.classList.remove("active");
  }

  toggle() {
    catalogueEl.classList.toggle("active");
  }

  refresh(categories) {
    catalogueEl.innerHTML = "";
    categories.forEach(category => {
      const categoryEl = document.createElement("div");
      categoryEl.classList.add("top-frame__left__catalogue-container__catalogue__category");
      categoryEl.setAttribute("data-category-id", category.id);
      categoryEl.setAttribute("data-category-name", category.categoryName);
      categoryEl.innerText = category.categoryName;
      catalogueEl.insertAdjacentElement("beforeend", categoryEl);
    });
  }
}

export default new CatalogueView();
