<template>
  <header class="header">
    <img src="../assets/logo.png" alt="logo" class="logo" />
    <app-header-menu />
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeaderMenu from "@/components/AppHeaderMenu.vue";

export default Vue.extend({
  name: "AppHeader",
  components: {
    AppHeaderMenu,
  },
});
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 0 9em;
  display: flex;
  align-items: center;
  gap: 100px;
  background-color: #c4c4c4;
}

.logo {
  height: 47px;
}
</style>
