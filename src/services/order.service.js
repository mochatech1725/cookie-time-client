import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class OrderService {

   static async createCustomerOrder(record) {
      return axios.get(`${SERVER_BASE_URL}/customer_order/add?campaign_id=${record.campaign_id}&customer_id=${record.customer_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}`)
       .then(response => {
         return response?.data;
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }

   static async updateCustomerOrder(record) {
      return axios.get(`${SERVER_BASE_URL}/customer_order/update?campaign_id=${record.campaign_id}&customer_id=${record.customer_id}&order_id=${record.order_id}&order_source=${record.order_source}&thinmint=${record.thinmint}&trefoil=${record.trefoil}&samoa=${record.samoa}&dosido=${record.dosido}&tagalong=${record.tagalong}&lemonup=${record.lemonup}&toffee_tastic=${record.toffee_tastic}&smores=${record.smores}&adventureful=${record.adventureful}&raspberry_rally=${record.raspberry_rally}}`)
       .then(response => {
         return response?.data;
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }

   static async deleteCustomerOrder(order_id, customer_id) {
      return axios.get(`${SERVER_BASE_URL}/customer_order/delete?order_id=${order_id}&customer_id=${customer_id}}`)
       .then(response => {
         return response?.data;
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }

    static async getCustomerOrders(campaign_id,customer_id) {
        return axios.get(`${SERVER_BASE_URL}/customer_order/get_customer_orders?campaign_id=${campaign_id}&customer_id=${customer_id}`)
         .then(response => {
            return response?.data;
         }).catch(err => {
            console.log(err);
            return [];
         } );
    }

    static async getOrders(campaign_id) {
      return axios.get(`${SERVER_BASE_URL}/customer_order/get_orders?campaign_id=${campaign_id}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return [];
       } );
   }
}
