import productService from "../services/productService.js";
import catalogueView from "../views/catalogueView.js";
import productListView from "../views/productListView.js";
import productListPagesView from "../views/productListPagesView.js";

class ProductListController {
  #pageable = { page: 1, size: 5 };
  #filter = {};

  clearFilter() {
    this.#filter = {};
  }

  setPage(page) {
    this.#pageable.page = page;
  }

  setFilterParam(paramName, paramValue) {
    this.#filter[paramName] = paramValue;
  }

  async refreshCatalogue() {
    const categories = await productService.getAllCategories();
    catalogueView.refresh(categories);
  }

  async refreshProductList() {
    const productPage = await productService.getProductsWithPagingAndFiltering(
      this.#pageable,
      this.#filter
    );
    const products = productPage.content;
    products.forEach(product => {
      const imageObjectUrlPromise = productService
        .getIdsOfProductImages(product.id)
        .then(ids => productService.getImageById(ids[0]))
        .then(imageBlob => URL.createObjectURL(imageBlob));
      product.imageObjectUrlPromise = imageObjectUrlPromise;
    });
    productListView.render(products);
    productListPagesView.render(productPage.totalPages, this.#pageable.page);
  }
}

const productListController = new ProductListController();

export default productListController;
