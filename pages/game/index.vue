<template>
  <!-- <Navbar> -->
    <Game v-if="hasAccess" />
  <!-- </Navbar> -->
</template>

<script>
// import Navbar from "../../components/layout/Navbar.vue";
import pageAccess from "@/utils/pageAccess";

export default {
  // components: { Navbar },
  mixins: [pageAccess],
};
</script>

<style scoped lang="scss"></style>
