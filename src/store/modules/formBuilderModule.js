import formBuilderApi from '@/api/formBuilderApi'
import { EventBus } from '@/utils'

const state = {
    formBuilder: {}
}

const mutations = {
    setFormBuilder(state, data) {
        state.formBuilder = data
    }
}

async function sendRequest(func) {
    EventBus.$emit('set-loader', { show: true })
    try {
        return await func()
    } catch(e) {
        throw e
    } finally {
        EventBus.$emit('set-loader', { show: false })
    }
}

const actions = {
    async getFormBuilder({ commit }, id) {
        const response = await sendRequest(() => {
            return formBuilderApi.getFormBuilder(id)
        })
        commit('setFormBuilder', response.data)
        return response.data
    },
    async saveFormBuilder({ }, data) {
        const response = await sendRequest(() => {
            return formBuilderApi.saveFormBuilder(data)
        })
        return response.data
    }
}

export default {
    state,
    mutations,
    actions
}
