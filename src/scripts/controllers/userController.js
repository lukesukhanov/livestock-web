import userService from "../services/userService.js";

class UserController {
  async register(firstName, lastName, email, password) {
    const responseStatus = await userService.register(firstName, lastName, email, password);
    if (responseStatus === 204) {
      alert("You have registered successfully");
    } else {
      alert("Your registration has failed");
    }
  }
}

const userController = new UserController();

export default userController;
