import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;

console.log("🚀 ~ file: Api.js:4 ~ BASE_URL:", BASE_URL);

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API. *
 *
 *
 *
 */

class TaxRiseAPI {
  // the token for with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.log("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TaxRiseAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log(
        "🚀 ~ file: Api.js:32 ~ TaxRiseAPI ~ request ~ err.response:",
        err.response
      );

      const errorData = err.response.data.error;
      console.log(
        "🚀 ~ file: Api.js:37 ~ TaxRiseAPI ~ request ~ errorData:",
        errorData
      );

      throw errorData;
    }
  }

  // Individual API routes
  static async getTasks(id) {
    const url = `tasks`;
    const res = await this.request(url);
    return res.productResult;
  }

  static async getTaskDetails(taskId) {
    const url = `tasks/${taskId}`;
    const res = await this.request(url);

    return res;
  }

  static async login(data) {
    const res = await this.request(`auth/login`, data, "post");
    console.log("🚀 ~ file: Api.js:56 ~ TaxRiseAPI ~ login ~ res:", res);
    return res.token;
  }

  static async signup(data) {
    const res = await this.request(`auth/signup`, data, "post");
    return res.token;
  }

  /** Get current user information. */

  static async getLoggedInUser(username) {
    const res = await this.request(`users/${username}`);
    console.log(
      "🚀 ~ file: Api.js:77 ~ TaxRiseAPI ~ getLoggedInUser ~ res:",
      res
    );

    return res;
  }

  static async createTask(data) {
    const res = await this.request(`tasks`, data, "post");
    return res;
  }
}

export default TaxRiseAPI;
