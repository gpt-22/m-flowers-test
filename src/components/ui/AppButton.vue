<template>
  <button
    class="app-button"
    :disabled="disabled"
    @click.prevent="$emit('click')"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppButton",
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";

.app-button {
  min-width: 132px;
  padding: 9px;
  border-radius: 5px;
  background-color: $color-primary;
  color: white;
  font: 700 14px "Roboto Mono";
  line-height: 18px;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: darken($color-primary, 5);
  }

  &:focus {
    outline-offset: 2px;
    outline: 2px solid darken($color-primary, 10);
  }

  &:active {
    background-color: darken($color-primary, 20);
  }

  &:disabled {
    background-color: #e6e6e6;
    color: darken(#e6e6e6, 10);
    cursor: not-allowed;
  }
}
</style>
