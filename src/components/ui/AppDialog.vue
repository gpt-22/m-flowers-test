<template>
  <div v-show="isShown" class="overlay">
    <div class="app-dialog">
      <img
        :src="require('@/assets/icons/close.svg')"
        alt="close"
        class="close-button"
        @click="toggleIsShown"
      />

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
  isShown: boolean;
}

export default Vue.extend({
  name: "AppDialog",
  data: function (): Data {
    return {
      isShown: true,
    };
  },
  watch: {
    isShown(newValue): void {
      this.$emit(newValue ? "open" : "close");
    },
  },
  methods: {
    toggleIsShown(): void {
      this.isShown = !this.isShown;
    },
  },
});
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000099;
}

.app-dialog {
  position: relative;
  padding: 32px;
  width: 600px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  box-shadow: 0 4px 4px 0 #00000040;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  cursor: pointer;
}
</style>
