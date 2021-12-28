import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import auth from './auth'

const Api = {

    init() {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = API_URL
        if (auth.getToken()) {
            this.addAuthorizationHeader()
        } else {
            this.removeAuthorizationHeader
        }
    },

    addAuthorizationHeader() {
        Vue.axios.defaults.headers.common[
            'Authorization'
        ] = `Token ${auth.getToken()}`
    },

    query(resource, params) {
        return Vue.axios.get(resource, params)
    },

    get(resource) {
        return Vue.axios.get(`${resource}`)
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
    },
}

export default Api