import { OrderService } from '../services/order.service.js';

const state = {
    orders: []
}

const actions = {
    getOrders({commit}, campaignId) {
        OrderService.getOrders(campaignId).catch(() => [])
        .then(orders => {
            commit('set', {key: 'orders', value: orders})
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

export const order  = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}