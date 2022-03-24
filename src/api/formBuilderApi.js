import { Http } from '@/classes/Http'
import { GET_API_URL, POST_API_URL } from '@/api/config'

export default {
    getFormBuilder(id) {
        return Http.get({
            url: `${GET_API_URL}/${id}`
        })
    },
    saveFormBuilder(data) {
        console.log('REQUEST payload is:', data)
        console.log('POSTING to:', POST_API_URL)
        return Http.post({
            url: POST_API_URL,
            data: data
        })
    }
}
