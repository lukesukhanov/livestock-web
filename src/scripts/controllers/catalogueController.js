import productService from "../services/productService.js";
import catalogueView from "../views/catalogueView.js";

class CatalogueController {
  async refreshCatalogue() {
    const categories = await productService.getAllCategories();
    catalogueView.refresh(categories);
  }
}

export default new CatalogueController();
