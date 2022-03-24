import axios from 'axios'

import HttpMockApis from '@/api/mocks/HttpMockApis'
import { USE_MOCK_DATA } from '@/api/config'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

if (USE_MOCK_DATA) {
    new HttpMockApis(axios)
}

class Http {
    static get(properties) {
        return axios({
            method: 'get',
            url: properties.url,
            params: properties.params
        })
    }

    static post(properties) {
        return axios({
            method: 'post',
            url: properties.url,
            data: properties.data
        })
    }

    static patch(properties) {
        return axios({
            method: 'patch',
            url: properties.url,
            data: properties.data
        })
    }

    static put(properties) {
        return axios({
            method: 'put',
            url: properties.url,
            data: properties.data
        })
    }

    static _delete(properties) {
        Http.init(properties)
        return axios({
            method: 'delete',
            url: properties.url,
            data: properties.data
        })
    }
}

export {
    Http
}
