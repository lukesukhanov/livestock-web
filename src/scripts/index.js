// Event listeners
import "./eventListeners/catalogueButtonEventListener.js";
import "./eventListeners/catalogueCategoryEventListener.js";
import "./eventListeners/overlayBodyEventListener.js";
import "./eventListeners/overlayFullEventListener.js";
import "./eventListeners/productListPagesEventListener.js";
import "./eventListeners/filtersSearchButtonEventHandler.js";
import "./eventListeners/filtersClearButtonEventHandler.js";
import "./eventListeners/topFrameSearchButtonEventHandler.js";
import "./eventListeners/topFrameSearchInputEventHandler.js";
import "./eventListeners/topFrameUserIconEventListener.js";
import "./eventListeners/filtersMinPriceInputEventHandler.js";
import "./eventListeners/filtersMaxPriceInputEventHandler.js";
import "./eventListeners/loginFormSubmitButtonEventListener.js";
import "./eventListeners/loginFormRegistrationButtonEventListener.js";
import "./eventListeners/registrationFormSubmitButtonEventHandler.js";
import "./eventListeners/cartIconEventListener.js";

// Controllers
import catalogueController from "./controllers/catalogueController.js";
import userController from "./controllers/userController.js";
import productListController from "./controllers/productListController.js";

// Run after page load
await userController.handleAuthorizationCodeInLocation();
await userController.tryLogin();
await catalogueController.refreshCatalogue();
productListController.parseFilterParamsFromLocation();
await productListController.refreshProductList();
