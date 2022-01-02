export const state = () => ({
    personalInfo: {
        userToken: null,
        profileData: null
    },
    showAuthModal: false
})

export const mutations = {
    SET_USER_TOKEN(state, payload) {
        state.personalInfo.userToken = payload
    },
    REMOVE_USER_TOKEN(state) {
        state.personalInfo.userToken = null
    },
    SET_USER_PROFILE(state, payload) {
        state.personalInfo.profileData = payload
    },
    REMOVE_USER_PROFILE(state) {
        state.personalInfo.profileData = null
    },
    SET_SHOW_AUTH_MODAL(state, payload) {
        state.showAuthModal = payload
    }
}
export const actions = {
    setUserToken({ commit }, res) {
        commit('SET_USER_TOKEN', res)
    },
    removeUserToken({ commit }, res) {
        commit('REMOVE_USER_TOKEN', res)
    },
    removeUserProfile({ commit }, res) {
        commit('REMOVE_USER_PROFILE', res)
    },
    setUserProfile({ commit }, res) {
        commit('SET_USER_PROFILE', res)
    },
    setShowAuthModal({ commit }, res) {
        commit('SET_SHOW_AUTH_MODAL', res)
    }

}
