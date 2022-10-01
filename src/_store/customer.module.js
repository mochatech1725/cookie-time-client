import { CustomerService } from '../services/customer.service.js';

const state = {
    customers: []
}

const actions = {
    getCustomers({commit}) {
       CustomerService.getCustomers().catch(() => [])
       .then(customers => {
           commit('set', {key: 'customers', value: customers})
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

export const customer = {
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: []
}