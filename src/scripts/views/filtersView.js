const filtersCategoryEl = document.querySelector(".filters__category__value");
const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");
const filtersPriceFromEl = document.querySelector(".filters__price__inputs__from__input");
const filtersPriceToEl = document.querySelector(".filters__price__inputs__to__input");

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
    filtersPriceFromEl.value = "";
    filtersPriceToEl.value = "";
  }
}

export default new FiltersView();
