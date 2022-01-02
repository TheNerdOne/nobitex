import { mapState, mapActions } from 'vuex'

export const authComputed = {
    ...mapState('auth', {
        userToken: (state) => state.personalInfo.userToken,
        authModal: (state) => state.showAuthModal,
        profileData: (state) => state.personalInfo.profileData
    }),
}
export const authMethods = mapActions('auth', [
    'setUserToken',
    'removeUserToken',
    'setUserProfile',
    'removeUserProfile',
    'setShowAuthModal'
])