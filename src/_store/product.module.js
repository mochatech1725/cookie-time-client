import { ProductService } from '../services/product.service.js';

const state = {
    products: []
}

const actions = {
    async getProducts({commit}) {
        const products  = await ProductService.getProducts()
        commit('set', {key: 'products', value: products})
    }
}

const mutations = {
    set (state, args ) {
        if (!args || !args.key)
            return
        state[args.key] = args.value;
    }
}

export const product = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}