import Vue from 'vue'
import Vuex from 'vuex'
import formBuilderModule from './modules/formBuilderModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        formBuilderModule
    }
})
