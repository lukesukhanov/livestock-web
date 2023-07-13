import { CART_API_URL } from "../config.js";

class CartService {
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
}

export default new CartService();
