import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constants.js'

export class CampaignService {

   static async addCampaign(campaign) {
      return axios.get(`${SERVER_BASE_URL}/campaign/add?campaign_name=${campaign.name}&campaign_year=${campaign.year}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return {};
       } );
   }

   static async getCampaigns() {
        return axios.get(`${SERVER_BASE_URL}/campaign/get_campaigns`)
         .then(response => {
            return response?.data;

         }).catch(err => {
            console.log(err);
            return [];
         } );
   }

    static async deleteCampaign(campaign_id) {
      return axios.get(`${SERVER_BASE_URL}/campaign/delete?campaign_id=${campaign_id}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return undefined;
       } );
    }

    static async updateCampgain(campaign) {
      return axios.get(`${SERVER_BASE_URL}/campaign/update?campaign_id=${campaign.campaign_id}&campaign_name=${campaign.name}&campaign_year=${campaign.year}`)
       .then(response => {
          return response?.data;
       }).catch(err => {
          console.log(err);
          return undefined;
       } );
    }
}
