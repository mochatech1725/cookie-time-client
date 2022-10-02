import Vue from 'vue';
import Vuex from 'vuex';
import {product} from './product.module.js'
import {order} from './order.module.js'
import {customer} from './customer.module.js'
import {inventory} from './inventory.module.js'
import {agent} from './agent.module.js'
import {campaign} from './campaign.module.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    product,
    order,
    inventory,
    customer,
    agent,
    campaign
  }
})
