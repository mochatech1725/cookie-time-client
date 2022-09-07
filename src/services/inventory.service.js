import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'


export class InventoryService {

    static async getInventory(campaign_id) {
        return axios.get(`${SERVER_BASE_URL}/inventory/get_inventory?campaign_id=${campaign_id}`)
         .then(response => {
            console.log(response);
         }).catch(err => {
            console.log(err);
            return [];
         } );
    }

    static async createTroopInventoryOrder(campaign_id, order_items, order_date) {
      return axios.get(`${SERVER_BASE_URL}/inventory/createTroopOrder?campaign_id=${campaign_id}&order_items=${JSON.stringify(order_items)}&order_date=${order_date}`)
       .then(response => {
          console.log(response);
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }

   static async createInventoryOrder(campaign_id,order_items, agent_id) {
      return axios.get(`${SERVER_BASE_URL}/inventory/createAgentOrder?campaign_id=${campaign_id}&order_items=${JSON.stringify(order_items)}&order_date=${order_date}&agent_id=${agen_id}`)
       .then(response => {
          console.log(response);
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }

}
