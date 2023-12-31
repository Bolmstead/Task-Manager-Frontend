import axios from "axios";

console.log(
  "process.env.REACT_APP_BACKEND_URL",
  process.env.REACT_APP_BACKEND_URL
);
const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;

/** API Class **/

class TaxRiseAPI {
  // the token for the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
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
    const res = await this.request(url, data, "put");
    return res;
  }

  static async createTask(data) {
    const res = await this.request(`tasks`, data, "post");
    return res;
  }
}

export default TaxRiseAPI;
