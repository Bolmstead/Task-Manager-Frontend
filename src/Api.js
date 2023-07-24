import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;

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
      if (err.response) {
        throw err.response.data.error;
      } else {
        throw { message: "Server Error" };
      }
    }
  }

  // Individual API routes

  static async login(data) {
    const res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  static async signup(data) {
    const res = await this.request(`auth/signup`, data, "post");
    return res.token;
  }

  static async getLoggedInUser(username) {
    const res = await this.request(`users/${username}`);
    return res;
  }
  static async getAllTasks() {
    const res = await this.request("tasks/all-tasks");
    return res;
  }

  static async getAllClients() {
    const res = await this.request(`users/all-clients`);
    return res;
  }

  static async getClientsTasks(username) {
    const res = await this.request(`tasks/all-clients-tasks/${username}`);
    return res;
  }

  static async getTaskDetails(taskId) {
    const url = `tasks/${taskId}`;
    const res = await this.request(url);
    return res;
  }

  static async createTask(data) {
    const res = await this.request(`tasks`, data, "post");
    return res;
  }
}

export default TaxRiseAPI;
