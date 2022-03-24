import MockAdapter from 'axios-mock-adapter'
import Status from '@/classes/Status'
import mockedFormFields from '@/api/mocks/mockedFormFields'
import { GET_API_URL, POST_API_URL } from '@/api/config'

export default class HttpMockApis {
    constructor(axios) {
        this.mock = new MockAdapter(axios, { delayResponse: 500 })
        this.getFormFields()
        this.saveFormFields()
    }

    getFormFields() {
        const re = new RegExp(`${GET_API_URL}/[\d\D]?`)
        this.mock.onGet(re).reply((request) => {
            const id = request.url.substr(request.url.lastIndexOf('/') + 1) || 1
            const result = mockedFormFields.find(i => i.id == id)
            return new Promise((resolve, reject) => {
                resolve([
                    Status.SUCCESS,
                    { data: result }
                ])
            })
        })
    }

    saveFormFields() {
        this.mock.onPost(POST_API_URL).reply((request) => {
            const formField = JSON.parse(request.data)

            console.log('SAVING form field on the backend:', formField)

            return new Promise((resolve, reject) => {
                resolve([
                    Status.SUCCESS,
                    { data: formField }
                ])
            })
        })
    }
}
