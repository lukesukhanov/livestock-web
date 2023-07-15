import { PRODUCT_CATEGORY_API_URL, PRODUCT_API_URL, PRODUCT_IMAGES_API_URL } from "../config.js";

/*
 * Methods for accessing the product API.
 */
class ProductService {
  /*
   * Sends a request to get all existing product categories.
  
   * Returns an array with the received categories.
   * Return example: [{id: 1, categoryName: "Овцы"}, {id: 1, categoryName: "Коровы"}]
   */
  async getAllCategories() {
    const response = await fetch(PRODUCT_CATEGORY_API_URL, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    switch (response.status) {
      case 200:
        return await response.json();
    }
  }

  /*
   * Sends a request to get all the products using the given filter.
   *
   * Returns an array with the received products.
   * Return example: {numberOfElements: 5, first: true, last: false, totalElements: 10,
   * totalPages: 2, content: [{id: 1, productName: "Овцы бараны", description:
   * "Продаю баранов и овец", quantity: 57, price: 9500, currency: "RUB",
   * category: "Овцы"}, ...]}
   */
  async getProductsWithPagingAndFiltering(filter) {
    const params = new URLSearchParams();
    Object.keys(filter).forEach(paramName => params.append(paramName, filter[paramName]));
    const url = PRODUCT_API_URL + "?" + params;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status === 200) return await response.json();
  }

  /*
   * Sends a request to get all ids of the images related to the given product.
   *
   * Returns an array with the ids of the images.
   * Return example: {idsOfImages: [1, 2, 3]}
   */
  async getIdsOfProductImages(productId) {
    const url = PRODUCT_IMAGES_API_URL + `?productId=${productId}`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    switch (response.status) {
      case 200:
        const responseJson = await response.json();
        return responseJson.idsOfImages;
    }
  }

  /*
   * Sends a request to get the image with the given id.
   *
   * Returns the blob with the received image.
   */
  async getImageById(imageId) {
    const url = PRODUCT_IMAGES_API_URL + `/${imageId}`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "image/jpeg",
      },
    });
    switch (response.status) {
      case 200:
        return await response.blob();
    }
  }
}

export default new ProductService();
