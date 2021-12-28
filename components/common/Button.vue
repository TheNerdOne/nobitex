<template>
  <div class="primary__button" @click="handleClick(newRoute)">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Button",
    },
    newRoute: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(payload) {
      this.$router.push(payload);
    },
  },
};
</script>

<style scoped lang="scss"></style>
