// Views
import "./views/catalogueView.js";
import "./views/productListView.js";
import "./views/productListPagesView.js";
import "./views/imageView.js";
import "./views/filtersView.js";
import "./views/loginFormView.js";
import "./views/registrationFormView.js";
import "./views/userIconView.js";

// Services
import "./services/productService.js";
import "./services/userService.js";
import "./services/cartService.js";

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
import "./eventListeners/filtersPriceFromInputEventHandler.js";
import "./eventListeners/filtersPriceToInputEventHandler.js";
import "./eventListeners/loginFormSubmitButtonEventListener.js";
import "./eventListeners/loginFormRegistrationButtonEventListener.js";
import "./eventListeners/registrationFormSubmitButtonEventHandler.js";

// Controllers
import catalogueController from "./controllers/catalogueController.js";
import userController from "./controllers/userController.js";
import productListController from "./controllers/productListController.js";

// Utils
import "./utils/stringUtils.js";

// Run after load
await userController.handleAuthorizationCodeInLocation();
await userController.tryLogin();
await catalogueController.refreshCatalogue();
await productListController.refreshProductList();
