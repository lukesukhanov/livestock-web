const filtersCategoryEl = document.querySelector(".filters__category__value");
const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");
const minPriceInputEl = document.querySelector(".filters__price__inputs__min-price__input");
const maxPriceInputEl = document.querySelector(".filters__price__inputs__max-price__input");

/*
 * Methods for rendering product filters on the left side of the page.
 */
class FiltersView {
  /*
   * Renders a category name in the filter box.
   */
  renderCategory(categoryId) {
    let category = "Все";
    if (categoryId) {
      const categoryEl = catalogueEl.querySelector(`[data-category-id="${categoryId}"]`);
      category = categoryEl.dataset.categoryName;
    }
    filtersCategoryEl.innerText = category;
  }

  /*
   * Resets all filters in the filter box.
   */
  clearFilters() {
    minPriceInputEl.value = "";
    maxPriceInputEl.value = "";
  }
}

export default new FiltersView();
