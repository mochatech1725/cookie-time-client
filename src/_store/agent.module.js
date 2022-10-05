import { AgentService } from '../services/agent.service.js';


const state = {
    agents: []
}

const actions = {
    async getAgents({commit}) {
        const agents = await AgentService.getAgents()
        commit('set', {key: 'agents', value: agents})
    }
}

const mutations = {
    set (state, args ) {
        if (!args || !args.key)
            return
        state[args.key] = args.value;
    }
}

export const agent = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}