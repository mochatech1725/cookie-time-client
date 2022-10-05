import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class ReportsService {

   static async generateCurrentSalesReport(campaign_id) {

      const response = await axios.get(`${SERVER_BASE_URL}/reports/get_current_sales?campaign_id=${campaign_id}`)
      return(response? response?.data : {});

   }

}
