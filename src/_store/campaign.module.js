import { CampaignService } from '../services/campaign.service.js'

const state = {
    campaigns: [],
    currentCampaignId: ''
}

const actions = {
    async getCampaigns({commit}) {
        return CampaignService.getCampaigns()
            .then(campaigns => {
                commit('set', {key: 'campaigns', value: campaigns})
                return(campaigns);
            }).catch(() => {
                return([])
            })
    },    
    async getCurrentCampaignId({commit}) {
        return CampaignService.getCampaigns()
            .then(campaigns => {
                if (campaigns.length) {
                    commit('set', {key: 'currentCampaignId', value: campaigns[0].campaign_id})
                    return(campaigns[0].campaign_id)
                } else {
                    return('');
                }
            }).catch(() => {
                return([])
            })
    }
}

const mutations = {
    set (state, args ) {
        if (!args || !args.key)
            return
        state[args.key] = args.value;
    }
}

export const campaign  = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}