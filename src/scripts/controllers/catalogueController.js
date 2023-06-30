import productService from "../services/productService.js";
import catalogueView from "../views/catalogueView.js";

class CatalogueController {
  async refreshCatalogue() {
    const categories = await productService.getAllCategories();
    catalogueView.refresh(categories);
  }
}

const catalogueController = new CatalogueController();
catalogueController.refreshCatalogue();

export default catalogueController;
