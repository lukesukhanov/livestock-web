import stringUtils from "../utils/stringUtils.js";
import {
  USERS_API_URL,
  LOGIN_ON_LIVESTOCK_API_URL,
  AUTHORIZE_ON_LIVESTOCK_API_URL,
  TOKEN_FROM_LIVESTOCK_API_URL,
  CLIENT_ID_FOR_LIVESTOCK,
  CLIENT_REDIRECT_URL_FOR_LIVESTOCK,
} from "../config.js";

/*
 * Methods for accessing the API for user registration and authorization.
 */
class UserService {
  /*
   * Sends a request to register a new user.
   *
   * Returns a response status, which is supposed to be 204.
   */
  async register(firstName, lastName, email, password) {
    const params = new URLSearchParams();
    params.append("firstName", firstName);
    params.append("lastName", lastName);
    params.append("email", email);
    params.append("password", password);
    const response = await fetch(USERS_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    return response.status;
  }

  /*
   * Sends a request to login a user on the authorization server.
   * Uses basic authorization.
   *
   * Returns a response status, which is supposed to be 204.
   */
  async loginOnLivestock(email, password) {
    const headers = {};
    if (email) headers["Authorization"] = "Basic " + btoa(email + ":" + password);
    const response = await fetch(LOGIN_ON_LIVESTOCK_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers,
    });
    return response.status;
  }

  /*
   * Sends a request to receive a grant from the authorization server.
   * The user should be authenticated beforehand on the authorization server.
   *
   * As a result, the query param with the authorization code will appear in the location.
   */
  async fetchAuthorizationCodeFromLivestock(codeVerifier, state) {
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID_FOR_LIVESTOCK);
    params.append("redirect_uri", CLIENT_REDIRECT_URL_FOR_LIVESTOCK);
    params.append("scope", "openid cart cart.write");
    const codeChallenge = await this.#generateCodeChallenge(codeVerifier);
    params.append("code_challenge", codeChallenge);
    params.append("code_challenge_method", "S256");
    params.append("state", state);
    window.location = AUTHORIZE_ON_LIVESTOCK_API_URL + "?" + params;
  }

  /*
   * Sends a request to receive an access token and an id token from the authorization server.
   * Uses the authorization code received earlier from the authorization server.
   *
   * Returns an access token and an id token or null if the request failed
   * For example:
   * {
   * "access_token": "eyJraWQiOiI...",
   * "scope": "openid cart cart.write",
   * "id_token": "eyJraWQiOiI...",
   * "token_type": "Bearer",
   * "expires_in": 600
   * }
   */
  async fetchTokensFromLivestock(authorizationCode, codeVerifier) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", authorizationCode);
    params.append("client_id", CLIENT_ID_FOR_LIVESTOCK);
    params.append("redirect_uri", CLIENT_REDIRECT_URL_FOR_LIVESTOCK);
    params.append("code_verifier", codeVerifier);
    const response = await fetch(TOKEN_FROM_LIVESTOCK_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    if (response.status === 200) {
      return await response.json();
    }
    return null;
  }

  async #generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
}

export default new UserService();
