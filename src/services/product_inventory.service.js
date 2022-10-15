import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'


export class ProductInventoryService {

    static async getInventory(campaign_id) {

      let query;

      if (!campaign_id) {
         query = `${SERVER_BASE_URL}/product_inventory/inventory`
      } else {
         query = `${SERVER_BASE_URL}/product_inventory/inventory?campaign_id=${campaign_id}`;
      }
      const response = await axios.get(query)
      return(response? response?.data : []);
    }

    static async createInventoryOrder(record) {

         const response = await axios.get(`${SERVER_BASE_URL}/product_inventory/create_inventory?campaign_id=${record.campaign_id}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}`)
         return(response? response?.data : {});
    }

    static async updateInventoryOrder(record) {

         const response = await axios.get(`${SERVER_BASE_URL}/product_inventory/update?campaign_id=${record.campaign_id}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}`)
         return(response? response?.data : {});
    }

   // static async createAgentInventoryOrder(record) {
   //    return axios.get(`${SERVER_BASE_URL}/inventory/createAgentOrder?campaign_id=${campaign_id}&order_items=${JSON.stringify(order_items)}&order_date=${order_date}&agent_id=${agent_id}`)
   //     .then(response => {
   //        console.log(response);
   //        return(response?.data);
   //     }).catch(err => {
   //        console.log(err);
   //        return [];
   //     } );
   // }

}
