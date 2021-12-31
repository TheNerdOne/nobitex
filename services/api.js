import axios from 'axios'
import auth from './auth'
import { API_URL } from '../config/HTTP'

const Api = {

    init() {
        axios.defaults.baseURL = API_URL
    },

    addAuthorizationHeader() {
        axios.defaults.headers.common['Authorization'] = `Token ${auth.getToken()}`
    },

    query(resource, params) {
        return axios.get(resource, params)
    },

    get(resource) {
        return axios.get(`${resource}`)
    },

    post(resource, params) {
        return axios.post(`${resource}`, params)
    },
}

export default Api