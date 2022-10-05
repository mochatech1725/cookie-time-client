import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class CampaignService {

   static async addCampaign(campaign) {

      const response = await axios.get(`${SERVER_BASE_URL}/campaign/add?campaign_name=${campaign.name}&campaign_year=${campaign.year}`)
      return(response? response?.data : {});
   }

   static async getCampaigns() {

      const response = await axios.get(`${SERVER_BASE_URL}/campaign/get_campaigns`)
      return(response? response?.data : []);
   }

    static async deleteCampaign(campaign_id) {

      const response = await axios.get(`${SERVER_BASE_URL}/campaign/delete?campaign_id=${campaign_id}`)
      return(response? response?.data : {});
    }

    static async updateCampgain(campaign) {

      const response = await axios.get(`${SERVER_BASE_URL}/campaign/update?campaign_id=${campaign.campaign_id}&campaign_name=${campaign.name}&campaign_year=${campaign.year}`)
      return(response? response?.data : {});
    }
}
