import userService from "../services/userService.js";
import stringUtils from "../utils/stringUtils.js";

class UserController {
  async register(firstName, lastName, email, password) {
    const responseStatus = await userService.register(firstName, lastName, email, password);
    if (responseStatus === 204) {
      alert("You have registered successfully");
    } else {
      alert("Your registration has failed");
    }
  }

  async fetchAuthorizationCodeFromLivestock(email, password) {
    const loginResponseStatus = await userService.loginOnLivestock(email, password);
    if (loginResponseStatus !== 204) return;
    const codeVerifier = stringUtils.generateRandomString(64);
    window.sessionStorage.setItem("livestockCodeVerifier", codeVerifier);
    const state = stringUtils.generateRandomString(32);
    window.sessionStorage.setItem("state", state);
    await userService.fetchAuthorizationCodeFromLivestock(codeVerifier, state);
  }

  async handleAuthorizationCodeInLocation() {
    const query = new URLSearchParams(window.location.search);
    const authorizationCode = query.get("code");
    if (!authorizationCode) return;
    const codeVerifier = window.sessionStorage.getItem("livestockCodeVerifier");
    const accessToken = await userService.fetchAccessTokenFromLivestock(
      authorizationCode,
      codeVerifier
    );
    console.log("accessToken", accessToken);
    if (!accessToken) return;
    window.sessionStorage.setItem("livestockAccessToken", accessToken);
    window.location = window.location.origin;
  }
}

const userController = new UserController();
userController.handleAuthorizationCodeInLocation();
console.log(window.sessionStorage.getItem("livestockAccessToken"));

export default userController;
