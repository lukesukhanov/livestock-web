import { CART_API_URL } from "../config.js";

class CartService {
  async getProductsFromCartWithPagingAndFiltering(filter, userEmail, accessToken) {
    const params = new URLSearchParams();
    Object.keys(filter).forEach(paramName => params.append(paramName, filter[paramName]));
    params.append("userEmail", userEmail);
    const response = await fetch(CART_API_URL + "?" + params, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (response.status === 200) return response.json();
  }

  async addProductToCart(userEmail, productId, quantity, accessToken) {
    const body = JSON.stringify({ userEmail, productId, quantity });
    await fetch(CART_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body,
    });
  }

  async removeProductFromCart(productId, userEmail, accessToken) {
    const params = new URLSearchParams();
    params.append("productId", productId);
    params.append("userEmail", userEmail);
    const response = await fetch(CART_API_URL + `/${productId}?${params}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.status;
  }
}

export default new CartService();
