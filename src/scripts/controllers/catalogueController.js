import productService from "../services/productService.js";
import catalogueView from "../views/catalogueView.js";

/*
 * Methods for managing the catalogue box.
 */
class CatalogueController {
  /*
   * Gets the existing product categories and puts them into the catalogue.
   */
  async refreshCatalogue() {
    const categories = await productService.getAllCategories();
    catalogueView.refresh(categories);
  }
}

export default new CatalogueController();
