<template>
  <nav class="app-header-menu">
    <div v-for="menuItem in menuItems" :key="menuItem.id" class="menu-item">
      {{ menuItem.label }}
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

interface MenuItem {
  id: string;
  label: string;
}

interface Data {
  menuItems: MenuItem[];
}

export default Vue.extend({
  name: "AppHeaderMenu",
  data: function (): Data {
    return {
      menuItems: [
        { id: "1", label: "Home" },
        { id: "2", label: "Catalog" },
        { id: "3", label: "Tenders" },
        { id: "4", label: "Trade" },
        { id: "5", label: "Web-Shop NL" },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.app-header-menu {
  display: flex;
  gap: 40px;
}

.menu-item {
  font-size: 16px;
  cursor: pointer;
}
</style>
