import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'


export class ProductService {

   static async addProduct(product_name, product_price) {
      return axios.get(`${SERVER_BASE_URL}/product/add?product_name=${product_name}&product_price=${product_price}`)
       .then(response => {
          console.log(response);
       }).catch(err => {
          console.log(err);
          return [];
       } );
  }

    static async getProducts() {
        return axios.get(`${SERVER_BASE_URL}/product/get_products`)
         .then(response => {
            console.log(response);
         }).catch(err => {
            console.log(err);
            return [];
         } );
    }
}
