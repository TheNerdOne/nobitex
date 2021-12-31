import { authComputed } from './helpers'
import { authMethods } from './helpers'

const authMixin = {
    computed: {
        ...authComputed,
    },
    methods: {
        ...authMethods,
    },
}
export default authMixin
