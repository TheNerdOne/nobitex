import authMixin from './mixins'
export default {
    data() {
        return {
            hasAccess: false,
        }
    },
    mixins:[authMixin],
    beforeMount() {
        const route = this.$route.path
        if (this.userToken !== null && route ==='game') {
            return true
        } else {
            return false
        }
    },
}
