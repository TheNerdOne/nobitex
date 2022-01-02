import api from './api'
const idpDataProvider = {
    getUserInfo() {
        return api.get('/users/profile')
    }
}

export default idpDataProvider