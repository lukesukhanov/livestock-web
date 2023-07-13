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
