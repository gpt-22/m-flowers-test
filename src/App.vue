<template>
  <div id="app">
    <app-header />
    <index-page />
    <app-dialog title="Please answer a few questions"> </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/AppHeader.vue";
import IndexPage from "./pages/IndexPage.vue";
import AppDialog from "@/components/ui/AppDialog.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader,
    IndexPage,
    AppDialog,
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
