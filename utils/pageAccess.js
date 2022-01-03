import AUTH from '@/services/auth'
export default {
    data() {
        return {
            hasAccess: false,
        }
    },
    beforeMount() {
        const route = this.$route.fullPath
        if (AUTH.getToken() !== null) {
            this.hasAccess = true
        } else if (route === '/game') {
            this.hasAccess = false
            this.$router.push({ path: '/' })
        }
    },
}
