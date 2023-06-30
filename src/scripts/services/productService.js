import { PRODUCT_CATEGORY_API_URL } from "../config.js";

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
}

export default new ProductService();
