const filtersCategoryEl = document.querySelector(".filters__category__value");
const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

class FiltersCategoryView {
  render(categoryId) {
    let category = "Все";
    if (categoryId) {
      const categoryEl = catalogueEl.querySelector(`[data-category-id="${categoryId}"]`);
      category = categoryEl.dataset.categoryName;
    }
    filtersCategoryEl.innerText = category;
  }
}

export default new FiltersCategoryView();
