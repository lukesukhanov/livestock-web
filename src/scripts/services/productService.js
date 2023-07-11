import { PRODUCT_CATEGORY_API_URL, PRODUCT_API_URL, PRODUCT_IMAGES_API_URL } from "../config.js";

class ProductService {
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

  async getProductsWithPagingAndFiltering(pageable, filter) {
    let url = PRODUCT_API_URL;
    url += "?" + "page=" + (pageable.page - 1) + "&" + "size=" + pageable.size;
    Object.keys(filter).forEach((param, i) => (url += "&" + `${param}=${filter[param]}`));
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
        return await response.json();
      case 400:
        return null;
    }
  }

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
