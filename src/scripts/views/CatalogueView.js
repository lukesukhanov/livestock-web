const overlayEl = document.querySelector(".overlay-catalogue");
const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

class CatalogueView {
  render() {
    catalogueEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  close() {
    overlayEl.classList.remove("active");
    catalogueEl.classList.remove("active");
  }

  toggle() {
    overlayEl.classList.toggle("active");
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
