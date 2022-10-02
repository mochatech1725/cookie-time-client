import { CampaignService } from '../services/campaign.service.js'

const state = {
    campaigns: []
}

const actions = {
    getCampaigns({commit}) {
        console.log('getCampaigns')
        CampaignService.getCampaigns().catch(() => [])
        .then(campaigns => {
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