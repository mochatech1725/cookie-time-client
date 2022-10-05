import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class CustomerService {

   static async addCustomer(customer) {

      const response = await axios.get(`${SERVER_BASE_URL}/customer/add?first_name=${customer.first_name}&last_name=${customer.last_name}&address=${customer.address}&city=${customer.city}&state=${customer.state}&zipcode=${customer.zipcode}&phone_number=${customer.phone_number}&email_address=${customer.email_address}`)
      return(response? response?.data : {});

  }

    static async getCustomers() {

      const response = await axios.get(`${SERVER_BASE_URL}/customer/get_customers`)
      return(response? response?.data : []);
    }

    static async deleteCustomer(customer_id) {
      const response = await axios.get(`${SERVER_BASE_URL}/customer/delete?customer_id=${customer_id}`)
      return(response? response?.data : {});
    }

    static async updateCustomer(customer) {
      const response = await axios.get(`${SERVER_BASE_URL}/customer/update?customer_id=${customer.customer_id}&first_name=${customer.first_name}&last_name=${customer.last_name}&address=${customer.address}&city=${customer.city}&state=${customer.state}&zipcode=${customer.zipcode}&phone_number=${customer.phone_number}&email_address=${customer.email_address}`)
      return(response? response?.data : {});
   }
}
