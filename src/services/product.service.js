import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'


export class ProductService {

   static async addProduct(product_name, product_price) {
      const response = await axios.get(`${SERVER_BASE_URL}/product/add?product_name=${product_name}&product_price=${product_price}`)
      return(response? response?.data : {});

  }

    static async getProducts() {
      const response = await axios.get(`${SERVER_BASE_URL}/product/products`)
      return(response? response?.data : []);
    }
}
