import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'
import { CustomerService } from './customer.service.js';

export class OrderService {

   static async createCustomerOrder(record) {
      const response = await axios.get(`${SERVER_BASE_URL}/customer_order/add?campaign_id=${record.campaign_id}&customer_id=${record.customer_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}`)
      return(response? response?.data : []);
   }

   static async updateCustomerOrder(record) {

      const response = await axios.get(`${SERVER_BASE_URL}/customer_order/update?campaign_id=${record.campaign_id}&customer_id=${record.customer_id}&order_id=${record.order_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}}`)
      return(response? response?.data : {});
   }

   static async deleteCustomerOrder(order_id, customer_id) {

      const response = await axios.get(`${SERVER_BASE_URL}/customer_order/delete?order_id=${order_id}&customer_id=${customer_id}}`)
      return(response? response?.data : {});
   }

   static async getCustomerOrders(campaign_id,customer_id) {
      
      const response = await axios.get(`${SERVER_BASE_URL}/customer_order/customer_orders?campaign_id=${campaign_id}&customer_id=${customer_id}`)
      return(response? response?.data : []);
   }

   static async getAllCustomerOrders(campaign_id) {

      const response = await axios.get(`${SERVER_BASE_URL}/customer_order/orders?campaign_id=${campaign_id}`)
      const orders = response?.data;
      if (orders) {
         return CustomerService.getCustomers().catch(() => [])
            .then(customers => {
               orders.forEach( o => {
                  const customer = customers.find(c => o.customer_id === c.customer_id);
                  if (customer) {
                     o.first_name = customer.first_name;
                     o.last_name = customer.last_name;
                  }
               })
               return(orders);
            });
      } else {
         return(orders);
      }
   }

   static async createAgentOrder(record) {

      const response = await axios.get(`${SERVER_BASE_URL}/agent_order/add?campaign_id=${record.campaign_id}&agent_id=${record.agent_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}`)
      return(response? response?.data : {});
   }

   static async updateAgentOrder(record) {

      const response = await axios.get(`${SERVER_BASE_URL}/agent_order/update?campaign_id=${record.campaign_id}&agent_id=${record.agent_id}&order_id=${record.order_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}}`)
      return(response? response?.data : {});
   }

   static async deleteAgentOrder(order_id, agent_id) {
      const response = await axios.get(`${SERVER_BASE_URL}/agent_order/delete?order_id=${order_id}&agent_id=${agent_id}}`)
      return(response? response?.data : {});
   }

    static async getAgentOrders(campaign_id,agent_id) {

        const response = await axios.get(`${SERVER_BASE_URL}/agent_order/agent_orders?campaign_id=${campaign_id}&agent_id=${agent_id}`)
        return(response? response?.data : []);
    }

    static async getAllAgentOrders(campaign_id) {

      const response = await axios.get(`${SERVER_BASE_URL}/agent_order/orders?campaign_id=${campaign_id}`)
      return(response? response?.data : []);
   }

}
