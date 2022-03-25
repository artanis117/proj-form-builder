import axios from 'axios'

import HttpMockApis from '@/api/mocks/HttpMockApis'
import { USE_MOCK_DATA_BY_DEFAULT } from '@/api/config'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

class Http {
    static startMock() {
        httpMockApis.startMock()
    }

    static stopMock() {
        httpMockApis.stopMock()
    }

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

const httpMockApis = new HttpMockApis(axios)
if (USE_MOCK_DATA_BY_DEFAULT) { Http.startMock() }

export {
    Http
}
