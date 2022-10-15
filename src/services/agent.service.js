import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class AgentService
 {

    static async getAgents() {
      console.log(`getAgents route: ${SERVER_BASE_URL}/agent/agents`);
 
      const response = await axios.get(`${SERVER_BASE_URL}/agent/agents`)
      return(response? response?.data : []);
    }

    static async getAgent(first_name, last_name) {

      const response = await axios.get(`${SERVER_BASE_URL}/agent/agent?first_name=${first_name}&last_name=${last_name}`)
      return(response? response?.data : {});
    }

    static async addAgent(first_name, last_name) {

      const response = await axios.get(`${SERVER_BASE_URL}/agent/add?first_name=${first_name}&last_name=${last_name}`)
      return(response? response?.data : {});
    }
}