// Event listeners
import "./eventListeners/catalogueButtonEventListener.js";
import "./eventListeners/catalogueCategoryEventListener.js";
import "./eventListeners/overlayBodyEventListener.js";
import "./eventListeners/overlayFullEventListener.js";
import "./eventListeners/topFrameSearchButtonEventHandler.js";
import "./eventListeners/topFrameSearchInputEventHandler.js";
import "./eventListeners/topFrameUserIconEventListener.js";
import "./eventListeners/loginFormSubmitButtonEventListener.js";
import "./eventListeners/loginFormRegistrationButtonEventListener.js";
import "./eventListeners/registrationFormSubmitButtonEventHandler.js";
import "./eventListeners/cartIconEventListener.js";
import "./eventListeners/cartProductListPagesEventListener.js";

// Controllers
import userController from "./controllers/userController.js";
import catalogueController from "./controllers/catalogueController.js";
import cartController from "./controllers/cartController.js";

// Run after load
await userController.handleAuthorizationCodeInLocation();
await userController.tryLogin();
await catalogueController.refreshCatalogue();
cartController.parseFilterParamsFromLocation();
await cartController.refreshCartProductsList();
