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
      console.log("🚀 ~ file: Api.js:32 ~ TaxRiseAPI ~ request ~ err:", err);
      const errorData = err.response.data;
      return errorData;
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
    console.log("🚀 ~ file: Api.js:57 ~ TaxRiseAPI ~ login ~ data:", data);
    const res = await this.request(`auth/token`, data, "post");
    return res.response.data;
  }

  static async register(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get current user information. */

  static async getLoggedInUser(username) {
    console.log(
      "🚀 ~ file: Api.js:64 ~ TaxRiseAPI ~ getUserInfo ~ username:",
      username
    );
    const res = await this.request(`users/${username}`);
    return res;
  }

  static async createTask(data) {
    const res = await this.request(`tasks`, data, "post");
    return res;
  }
}

export default TaxRiseAPI;
