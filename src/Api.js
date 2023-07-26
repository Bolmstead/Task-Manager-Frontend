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
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
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

  static async getAllAssignments() {
    const res = await this.request("assignments/all");
    return res;
  }
  static async getAllTasks() {
    const res = await this.request("tasks/all");
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

  static async getAssignmentDetails(assignmentId) {
    const url = `assignments/details/${assignmentId}`;


    const res = await this.request(url);

    return res;
  }

  static async editAssignment(assignmentId, data) {
    const url = `assignments/edit/${assignmentId}`;
    console.log(
      "🚀 ~ file: Api.js:79 ~ TaxRiseAPI ~ getTaskDetails ~ url:",
      url
    );

    const res = await this.request(url, data, "put");
    console.log(
      "🚀 ~ file: Api.js:79 ~ TaxRiseAPI ~ getTaskDetails ~ res:",
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
