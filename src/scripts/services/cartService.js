import { CART_API_URL } from "../config.js";

/*
 * Methods for accessing the cart API.
 */
class CartService {
  /*
   * Sends a request to get the products in the cart of the given user.

   * Returns a page with the received products or null if the request failed.
   * For example: {numberOfElements: 5, first: true, last: false, totalElements: 10,
   * totalPages: 2, content: [{productId: 1, productName: "Овцы бараны", description: "Продаю
   * баранов и овец", quantity: 2, price: 9500, currency: "RUB"}, ...]}
   */
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

  /*
   * Sends a request to add the given quantity of the given product into the user's cart.
   */
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

  /*
   * Sends a request to remove the given product from the user's cart.

   * Returns a response status, which is supposed to be 204.
   */
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

  /*
   * Sends a request to remove all products from the user's cart.
  
   * Returns a response status, which is supposed to be 204.
   */
  async removeAllProductsFromCart(userEmail, accessToken) {
    const response = await fetch(CART_API_URL + "?userEmail=" + userEmail, {
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
