import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : `http://localhost:process.env.${process.env.REACT_APP_BACKEND_PORT}`;

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
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TaxRiseAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log("🚀 ~ file: Api.js:26 ~ TaxRiseAPI ~ request ~ err", err);
      throw err;
    }
  }

  // Individual API routes
  static async getTasks(id) {
    const queryString = Object.keys(searchObject)
      .map((key) => key + "=" + searchObject[key])
      .join("&");
    let url = `tasks/?` + queryString;
    let res = await this.request(url);
    return res.productResult;
  }

  static async getTaskDetails(taskId) {
    const queryString = Object.keys(searchObject)
      .map((key) => key + "=" + searchObject[key])
      .join("&");

    let url = `tasks/?` + queryString;
    let res = await this.request(url);

    return res;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async createTask(data) {
    let res = await this.request(`tasks`, data, "post");
    return res;
  }
}

export default TaxRiseAPI;
