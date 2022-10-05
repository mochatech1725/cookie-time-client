import { OrderService } from '../services/order.service.js';

const state = {
    orders: [],
    agent_orders: []
}

const actions = {
    async getAllCustomerOrders({commit}, campaignId) {
        const orders = await OrderService.getAllCustomerOrders(campaignId)
        commit('set', {key: 'orders', value: orders})
    },
    async getAllAgentOrders({commit}, campaignId) {
        const orders = await OrderService.getAllAgentOrders(campaignId)
        commit('set', {key: 'agent_orders', value: orders})
    }
}

const mutations = {
    set (state, args ) {
        if (!args || !args.key)
            return
        state[args.key] = args.value;
    }
}

export const order  = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}