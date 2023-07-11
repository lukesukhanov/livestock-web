import stringUtils from "../utils/stringUtils.js";
import {
  USERS_API_URL,
  LOGIN_ON_LIVESTOCK_API_URL,
  AUTHORIZE_ON_LIVESTOCK_API_URL,
  TOKEN_FROM_LIVESTOCK_API_URL,
  CLIENT_ID_FOR_LIVESTOCK,
  CLIENT_REDIRECT_URL_FOR_LIVESTOCK,
} from "../config.js";

class UserService {
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

  async fetchAuthorizationCodeFromLivestock(codeVerifier, state) {
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID_FOR_LIVESTOCK);
    params.append("redirect_uri", CLIENT_REDIRECT_URL_FOR_LIVESTOCK);
    params.append("scope", "openid");
    const codeChallenge = await this.#generateCodeChallenge(codeVerifier);
    params.append("code_challenge", codeChallenge);
    params.append("code_challenge_method", "S256");
    params.append("state", state);
    window.location = AUTHORIZE_ON_LIVESTOCK_API_URL + "?" + params;
  }

  async fetchAccessTokenFromLivestock(authorizationCode, codeVerifier) {
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
      const responseBody = await response.json();
      return responseBody["access_token"];
    }
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
