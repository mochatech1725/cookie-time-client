import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class AgentService
 {

    static async getAgents() {
         console.log(`getAgents route: ${SERVER_BASE_URL}/agent/get_agents`);
         
        return axios.get(`${SERVER_BASE_URL}/agent/get_agents`)
         .then(response => {
           console.log('response=', response)
           return response?.data;
         }).catch(err => {
            console.log(err);
            return [];
         } );
    }

    static async getAgent(first_name, last_name) {
        return axios.get(`${SERVER_BASE_URL}/agent/get_agent?first_name=${first_name}&last_name=${last_name}`)
         .then(response => {
            return response?.data;
         }).catch(err => {
            console.log(err);
            return [];
         });
    }

    static async addAgent(first_name, last_name) {
        return axios.get(`${SERVER_BASE_URL}/agent/addfirst_name=${first_name}&last_name=${last_name}`)
         .then(response => {
            return response?.data;
         }).catch(err => {
            console.log(err);
            return [];
         });
    }
}