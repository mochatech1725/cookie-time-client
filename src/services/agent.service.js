import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constants.js";

export class AgentService {
  static async getAgents() {
    return axios
      .get(`${SERVER_BASE_URL}/agent/get_agents`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  static async getAgent(first_name, last_name) {
    return axios
      .get(
        `${SERVER_BASE_URL}/agent/get_agent?first_name=${first_name}&last_name=${last_name}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  static async addAgent(first_name, lat_name) {
    return axios
      .get(
        `${SERVER_BASE_URL}/agent/addfirst_name=${first_name}&last_name=${last_name}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}
