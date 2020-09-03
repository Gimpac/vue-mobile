import Vue from 'vue'
import Vuex from 'vuex'
import getters from './vuex/getter'
import common from './vuex/common'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common
    },
    getters
})

export default store