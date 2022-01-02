<template>
  <b-modal
    id="modal"
    no-close-on-esc
    hide-footer
    centered
    headerClass="p-3 border-bottom-0"
    header-close-variant="dark"
    cancel-title
    ref="myModal"
  >
    <div class="error-wrapper p-3">
      <div class="mb-4 text-center"></div>
      <div class="title text-center">لطفا توکن خود را وارد کنید</div>
      <div class="w-100">
        <CustomInput @input="tokenValue = $event" />
      </div>
      <div v-if="message" class="w-100 text-center text-danger my-3">
        {{ message }}
      </div>
      <div class="mt-3 float-right w-100">
        <div class="d-flex align-items-center justify-content-between">
          <b-button class="col-5" variant="secondary" block @click="closeModal"
            >انصراف</b-button
          >
          <b-button class="ms-2 col-5" variant="primary" block @click="submit"
            >ثبت</b-button
          >
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import CustomInput from "./CustomInput.vue";
export default {
  components: { CustomInput },
  props: {
    message: {
      type: String,
    },
  },
  data() {
    return {
      tokenValue: "",
    };
  },
  methods: {
    submit() {
      this.$emit("token", this.tokenValue);
    },
    closeModal() {
      this.$store.dispatch("auth/setShowAuthModal", false).then(() => {
        this.$bvModal.hide("modal");
      });
    },
  },
  mounted() {
    this.$bvModal.show("modal");
    this.$root.$on("bv::modal::hidden", () => {
      this.$store.dispatch("auth/setShowAuthModal", false);
    });
  },
  beforeDestroy() {
    this.$bvModal.hide("modal");
  },
};
</script>

<style scoped lang="scss">
@import "../../design/scss/modal";
</style>
