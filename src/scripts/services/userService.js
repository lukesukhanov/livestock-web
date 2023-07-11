import { USERS_API_URL } from "../config.js";

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
}

export default new UserService();
