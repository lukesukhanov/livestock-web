import userService from "../services/userService.js";
import stringUtils from "../utils/stringUtils.js";
import userIconView from "../views/userIconView.js";

/*
 * Methods for user's registration and authorization.
 */
class UserController {
  /*
   * Sends a request to register a new user.
   * Shows a message with the registration result.
   */
  async register(firstName, lastName, email, password) {
    const responseStatus = await userService.register(firstName, lastName, email, password);
    if (responseStatus === 204) {
      alert("You have registered successfully");
    } else {
      alert("Your registration has failed");
    }
  }

  /*
   * Sends a request to login a user on the authorization server.
   * If succeeded, sends a request to receive a grant from the authorization server.
   *
   * As a result, the query param with the authorization code will appear in the location.
   */
  async fetchAuthorizationCodeFromLivestock(email, password) {
    const loginResponseStatus = await userService.loginOnLivestock(email, password);
    if (loginResponseStatus !== 204) return;
    const codeVerifier = stringUtils.generateRandomString(64);
    window.sessionStorage.setItem("livestockCodeVerifier", codeVerifier);
    const state = stringUtils.generateRandomString(32);
    window.sessionStorage.setItem("livestockState", state);
    await userService.fetchAuthorizationCodeFromLivestock(codeVerifier, state);
  }

  /*
   * Checks if authorization code is presented in the current location's query.
   * If so, sends a request to receive a token from the authorization server using this code.
   *
   * Reloads page with the authorization code removed from the query.
   */
  async handleAuthorizationCodeInLocation() {
    const query = new URLSearchParams(window.location.search);
    const authorizationCode = query.get("code");
    if (!authorizationCode) return;
    const state = query.get("state");
    if (!state || state !== window.sessionStorage.getItem("livestockState"))
      window.location = window.location.origin;
    const codeVerifier = window.sessionStorage.getItem("livestockCodeVerifier");
    const tokens = await userService.fetchTokensFromLivestock(authorizationCode, codeVerifier);
    if (tokens) {
      const accessToken = tokens["access_token"];
      window.sessionStorage.setItem("livestockAccessToken", accessToken);
      const idToken = this.#parseJwt(tokens["id_token"]);
      window.sessionStorage.setItem("livestockIdToken", idToken);
    }
    window.location = window.location.origin;
  }

  /*
   * Decodes the payload of the JWT token.
   */
  #parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }

  /*
   * Checks current authorization and starts a login process if it's needed.
   *
   * This method is ugly and should be refactored.
   */
  async tryLogin() {
    const idTokenString = window.sessionStorage.getItem("livestockIdToken");
    if (!idTokenString) {
      this.clearAuthentication();
      this.fetchAuthorizationCodeFromLivestock();
      return;
    }
    const idToken = JSON.parse(idTokenString);
    if (idToken["exp"] < new Date().getTime() / 1000) {
      window.sessionStorage.removeItem("livestockIdToken");
      this.clearAuthentication();
      this.fetchAuthorizationCodeFromLivestock();
      return;
    }
    userIconView.renderUsername(idToken["given_name"]);
  }

  /*
   * Removes tokens from the session storage, clears the username on the top frame's user icon.
   */
  clearAuthentication() {
    window.sessionStorage.removeItem("livestockIdToken");
    window.sessionStorage.removeItem("livestockAccessToken");
    userIconView.clearUsername();
  }
}

export default new UserController();
