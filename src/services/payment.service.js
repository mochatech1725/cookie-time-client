import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constants.js";

export class PaymentsService {
  static async getAgentPayments(campaign_id, agent_id) {
    return axios
      .get(
        `${SERVER_BASE_URL}/payment/get_agent_payments?campaign_id=${campaign_id},agent_id=${agent_id}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  static async getTroopPayments(campaign_id) {
    return axios
      .get(
        `${SERVER_BASE_URL}/payment/get_troop_payments?campaign_id,=${campaign_id}`
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
