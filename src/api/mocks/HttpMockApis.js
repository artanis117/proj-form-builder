import MockAdapter from 'axios-mock-adapter'
import Status from '@/classes/Status'
import mockedFormFields from '@/api/mocks/mockedFormFields'
import { GET_API_URL, POST_API_URL } from '@/api/config'

export default class HttpMockApis {
    constructor(axios) {
        this.axios = axios
    }

    startMock() {
        this.mock = new MockAdapter(this.axios, { delayResponse: 500 })
        this.getFormFields()
        this.saveFormFields()
    }

    stopMock() {
        this.mock && this.mock.restore()
    }

    getFormFields() {
        this.mock.onGet(GET_API_URL).reply(() => {
            return new Promise((resolve, reject) => {
                resolve([
                    Status.SUCCESS,
                    mockedFormFields
                ])
            })
        })
    }

    getFormFields() {
        const re = new RegExp(`${GET_API_URL}/[\d\D]?`)
        this.mock.onGet(re).reply((request) => {
            const id = request.url.substr(request.url.lastIndexOf('/') + 1) || 1
            const result = mockedFormFields.find(i => i.id == id)
            return new Promise((resolve, reject) => {
                resolve([
                    Status.SUCCESS,
                    result
                ])
            })
        })
    }

    saveFormFields() {
        this.mock.onPost(POST_API_URL).reply((request) => {
            const formField = JSON.parse(request.data)

            console.log('SAVING form field on the backend:', formField)

            let mockedFormField = mockedFormFields.find(i => i.id == formField.id)
            Object.assign(mockedFormField, formField)

            return new Promise((resolve, reject) => {
                resolve([
                    Status.SUCCESS,
                    formField
                ])
            })
        })
    }
}
