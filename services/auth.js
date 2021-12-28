export const TOKEN_KEY = 'token'
import Cookies from 'js-cookie'

export const getToken = () => {
    return Cookies.get(TOKEN_KEY)
}

export const setToken = (token) => {
    if (!token || token.length === 0 || typeof token !== 'string') return

    Cookies.set(TOKEN_KEY, token, { expires: 7 })
}

export const deleteToken = () => {
    Cookies.remove(TOKEN_KEY)
}

export default { TOKEN_KEY, getToken, setToken, deleteToken }
