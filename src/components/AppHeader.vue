<template>
  <header class="header">
    <img src="../assets/logo.png" alt="logo" class="logo" />
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppHeader",
});
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 0 9em;
  display: flex;
  align-items: center;
  background-color: #c4c4c4;
}

.logo {
  height: 47px;
}
</style>
