<template>
  <div class="nav">
    <input type="checkbox" id="nav-check" />

    <div class="nav-header">
      <div
        class="nav-title cursor-pointer"
        :key="loginBtnKey"
        @click="showModalFunc"
      >
        {{ userToken ? "خروج" : "ورود" }}
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>

    <div class="nav-links">
      <NuxtLink event="" to="/game">بازی</NuxtLink>
      <NuxtLink to="/prices">قیمت لحظه‌ای</NuxtLink>
      <NuxtLink to="/">خانه</NuxtLink>
    </div>

    <slot>
      <router-view></router-view>
    </slot>
    <Modal v-if="authModal" :key="authModalKey" @token="setTokenForAuth" />
  </div>
</template>

<script>
import Button from "../common/Button.vue";
import Modal from "@/components/common/modal.vue";
import API from "@/services/api";
import AUTH from "@/services/auth";
import authMixin from "@/utils/mixins/";
export default {
  mixins: [authMixin],
  components: { Button, Modal },
  data() {
    return {
      loginBtnKey: 0,
      authModalKey: 1,
      showModal: false,
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
        this.removeUserToken();
        localStorage.removeItem("Token");
      } else {
        this.setShowAuthModal(true);
      }
    },
    setTokenForAuth(token) {
      AUTH.setToken(token);
      API.addAuthorizationHeader();
      this.setUserToken(token);
      this.setShowAuthModal(false);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../design/scss/navbar";
</style>
