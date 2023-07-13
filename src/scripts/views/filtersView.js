const filtersCategoryEl = document.querySelector(".filters__category__value");
const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");
const minPriceInputEl = document.querySelector(".filters__price__inputs__min-price__input");
const maxPriceInputEl = document.querySelector(".filters__price__inputs__max-price__input");

class FiltersView {
  renderCategory(categoryId) {
    let category = "Все";
    if (categoryId) {
      const categoryEl = catalogueEl.querySelector(`[data-category-id="${categoryId}"]`);
      category = categoryEl.dataset.categoryName;
    }
    filtersCategoryEl.innerText = category;
  }

  clearFilters() {
    minPriceInputEl.value = "";
    maxPriceInputEl.value = "";
  }
}

export default new FiltersView();
