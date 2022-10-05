import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class PaymentsService {

    static async getAgentPayments(campaign_id, agent_id) {
      const response = await axios.get(`${SERVER_BASE_URL}/payment/get_agent_payments?campaign_id=${campaign_id},agent_id=${agent_id}`)
      return(response? response?.data : []);
    }

    static async getTroopPayments(campaign_id) {
      const response = await axios.get(`${SERVER_BASE_URL}/payment/get_troop_payments?campaign_id,=${campaign_id}`)
      return(response? response?.data : []);
  }
}
