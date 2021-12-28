<template>
  <div class="main-div">
    <Button title="ورود" @click.native="kirekhari" />
    <div v-for="(data, idx) in navData" :key="idx">
      <Button :title="data.title" :newRoute="data.route" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import API from '../services/api'
import AUTH from '../services/auth'
export default {
  name: "IndexPage",
  components: {
    Button,
  },
  data() {
    return {
      navData: [
        { title: "قیمت لحظه‌ای", route: "/prices" },
        { title: "بازی", route: "/game" },
      ],
    };
  },
  methods: {
    kirekhari(){
       this.setToken(token)
          API.addAuthorizationHeader()
    }
  },
};
</script>
<style scoped lang="scss">
@import "../design/scss/button";
</style>
