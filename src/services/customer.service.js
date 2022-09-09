import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class CustomerService {

   static async addCustomer(first_name, last_name, address, city, state, zipcode, phone_number) {
      return axios.get(`${SERVER_BASE_URL}/customer/add?first_name=${first_name}&last_name=${last_name}&address=${address}&city=${city}&state=${state}&zipcode=${zipcode}&phone_number=${phone_number}`)
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
}
