import { ProductInventoryService } from '../services/product_inventory.service.js';

const state = {
    product_inventory: []
};

const actions = {
    
     async getInventory({commit}, campaign_id) {
        const inventory = await ProductInventoryService.getInventory(campaign_id)
        commit('set', {key: 'product_inventory', value:inventory})
    }
}

const mutations = {
    set (state, args ) {
        if (!args || !args.key)
            return
        state[args.key] = args.value;
    }
}

export const inventory = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}