<template>
  <div class="main-div">
    <Navbar />
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import Navbar from "@/components/layout/Navbar.vue";
import AUTH from "@/services/auth";
import authMixin from "@/utils/mixins/";
export default {
  name: "IndexPage",
  mixins: [authMixin],
  components: {
    Button,
    Navbar,
  },
  data() {
    return {
      authModalKey: 0,
      hasAuth: null,
    };
  },
  computed: {},
  methods: {
    authChecker() {
      let userToken;
      userToken = AUTH.getToken();
      if (userToken) {
        this.setUserToken(userToken);
        this.hasAuth = true;
      }
    },
    setTokenForAuth(token) {
      AUTH.setToken(token);
      API.addAuthorizationHeader();
      this.setUserToken(token);
      this.showModal(false);
    },
  },

  mounted() {
    this.authChecker();
  },
};
</script>
<style scoped lang="scss">
@import "@/design/scss/button";
</style>
