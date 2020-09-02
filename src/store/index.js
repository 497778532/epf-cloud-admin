import Vue from 'vue'
import Vuex from 'vuex'

import cnode from './cnode'
import user from './user'
import tabs from './tabs'
import onemap from '../pages/admin/onemap/store'
import getters from './getters'
import screen from '../../src/components/store'
import jcpgyj from '../pages/admin/monitorassess/store'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cnode,
    user,
    tabs,
    onemap,
    screen,
    jcpgyj
  },
  getters
})
