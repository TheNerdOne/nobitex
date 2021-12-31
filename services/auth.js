export const TOKEN_KEY = 'Token'

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
    if (!token || token.length === 0 || typeof token !== 'string') return

    localStorage.setItem(TOKEN_KEY, token)
}


export default { TOKEN_KEY, getToken, setToken }
