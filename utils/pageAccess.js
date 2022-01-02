import authMixin from './mixins'
export default {
    data() {
        return {
            hasAccess: false,
        }
    },
    mixins: [authMixin],
    beforeMount() {
        const route = this.$route.fullPath
        if (this.userToken === null && route === '/game') {
            this.hasAccess = false
            this.$router.push({ path: '/' })
        } else {
            this.hasAccess = true
        }
    },
}
