<template>
  <div id="app">
    <app-header />
    <index-page />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/AppHeader.vue";
import IndexPage from "@/modules/questionnaire/pages/IndexPage.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader,
    IndexPage,
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";

#app {
  font-family: "Roboto Mono", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
