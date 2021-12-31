import api from './api'
const pricesDataProvider = {
    getCoinDetail(params){
        return api.post('market/stats',params)
    }
} 

export default pricesDataProvider