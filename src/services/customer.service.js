import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class CustomerService {

   static async addCustomer(item) {
      return axios.get(`${SERVER_BASE_URL}/customer/add?first_name=${item.first_name}&last_name=${item.last_name}&address=${item.address}&city=${item.city}&state=${item.state}&zipcode=${item.zipcode}&phone_number=${item.phone_number}&email_address=${item.email_address}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return [];
       } );
  }

    static async getCustomers() {
        return axios.get(`${SERVER_BASE_URL}/customer/get_customers`)
         .then(response => {
            return response?.data;

         }).catch(err => {
            console.log(err);
            return [];
         } );
    }

    static async deleteCustomer(customer_id) {
      return axios.get(`${SERVER_BASE_URL}/customer/delete?customer_id=${customer_id}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return undefined;
       } );
  }
}
