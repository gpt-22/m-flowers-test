<template>
  <label class="app-radio-button">
    <input type="radio" :name="label" :checked="checked" />
    <span class="text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppRadioButton",
  props: {
    text: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";

$radioIconsPath: "@/assets/icons/";

.app-radio-button {
  display: flex;
  position: relative;
  cursor: pointer;
}

[type="radio"] {
  appearance: none;

  &:checked ~ .text::before {
    background: url($radioIconsPath + "radio-button-checked.svg") center center;
  }
}

.text {
  margin-left: 34px;
  font: 400 12px "Roboto Mono";
  line-height: 18px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    background: url($radioIconsPath + "radio-button-default.svg") center center;
  }
}
</style>
