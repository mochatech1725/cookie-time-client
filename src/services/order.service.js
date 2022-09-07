import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constants.js";

export class OrderService {
  static async createCustomerOrderItem(
    customer_id,
    campaign_id,
    product_id,
    quantity
  ) {
    return axios
      .get(
        `${SERVER_BASE_URL}/order/createCustomerOrder?campaign_id=${campaign_id}&customer_id=${customer_id}&product_id=${product_id}&quantity=${quantity}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  static async createCustomerOrder(
    customer_id,
    campaign_id,
    order_source,
    order_items
  ) {
    return axios
      .get(
        `${SERVER_BASE_URL}/order/createCustomerOrder?campaign_id=${campaign_id}&customer_id=${customer_id}&order_source=${order_source}&order_items=${JSON.stringify(
          order_items
        )}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  static async getCustomerOrders(campaign_id, customer_id) {
    return axios
      .get(
        `${SERVER_BASE_URL}/order/get_customers_order?campaign_id=${campaign_id}&customer_id=${customer_id}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}
