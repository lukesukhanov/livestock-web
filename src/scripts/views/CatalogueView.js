const catalogueEl = document.querySelector(".top-frame__left__catalogue-container__catalogue");

/*
 * Methods for rendering a catalogue box after clicking the 'catalogue' button.
 */
class CatalogueView {
  /*
   * Renders a catalogue box.
   */
  render() {
    catalogueEl.classList.add("active");
  }

  /*
   * Closes a catalogue box.
   */
  close() {
    catalogueEl.classList.remove("active");
  }

  /*
   * Toggles a catalogue box.
   */
  toggle() {
    catalogueEl.classList.toggle("active");
  }

  /*
   * Adds given categories into the catalogue box.
   */
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
