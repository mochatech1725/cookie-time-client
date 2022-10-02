import { CampaignService } from '../services/campaign.service.js'

const state = {
    campaigns: [],
    currentCampaignId: ''
}

const actions = {
    getCampaigns({commit}) {
        console.log('campaign module getCampaigns')
        CampaignService.getCampaigns().catch(() => [])
        .then(campaigns => {
            if (campaigns.length) {
                commit('set', {key: 'currentCampaignId', value: campaigns[0].campaign_id})
            }
            commit('set', {key: 'campaigns', value: campaigns})
        });
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