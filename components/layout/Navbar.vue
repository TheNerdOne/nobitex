<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-nav>
        <b-nav-form>
          <b-button
            class="cursor-pointer"
            :key="loginBtnKey"
            @click="showModalFunc"
          >
            {{ userToken ? "خروج" : "ورود" }}
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <NuxtLink class="text-light" to="/">خانه</NuxtLink></b-nav-item
          >
          <b-nav-item>
            <NuxtLink class="text-light" to="/prices"
              >قیمت لحظه‌ای</NuxtLink
            ></b-nav-item
          >
          <b-nav-item disabled>
            <NuxtLink class="text-light" to="/game">بازی</NuxtLink></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="profileData">
          <b-nav-item>
            {{ `${profileData.firstName} ${profileData.lastName}` }}</b-nav-item
          ><b-nav-item> {{ profileData.email }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <slot>
      <router-view></router-view>
    </slot>
    <Modal
      v-if="authModal"
      :key="authModalKey"
      @token="setTokenForAuth"
      :message="authErrMessage"
    />
  </div>
</template>

<script>
import Button from "../common/Button.vue";
import Modal from "@/components/common/modal.vue";
import API from "@/services/api";
import AUTH from "@/services/auth";
import idpDataProvider from "@/services/idp";
import authMixin from "@/utils/mixins/";
export default {
  mixins: [authMixin],
  components: { Button, Modal },
  data() {
    return {
      loginBtnKey: 0,
      authModalKey: 1,
      showModal: false,
      authErrMessage: "",
    };
  },
  computed: {
    hasToken() {
      if (AUTH.getToken() != null) {
        this.loginBtnKey += 1;
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    showModalFunc() {
      if (this.userToken) {
        this.removeAuth();
        if (this.$route.fullPath === "/game") {
          this.$router.push({ path: "/" });
        }
      } else {
        this.setShowAuthModal(true);
      }
    },
    removeAuth() {
      this.removeUserToken();
      this.removeUserProfile();
      localStorage.removeItem("Token");
    },
    setTokenForAuth(token) {
      AUTH.setToken(token);
      API.addAuthorizationHeader();
      idpDataProvider
        .getUserInfo()
        .then((res) => {
          this.setUserProfile(res.data.profile).then(() => {
            this.setUserToken(token);
            this.setShowAuthModal(false);
          });
        })
        .catch((err) => {
          this.removeAuth();
          this.authErrMessage = err.response.data.detail;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../design/scss/navbar";
</style>
