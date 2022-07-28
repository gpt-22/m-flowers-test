<template>
  <label class="app-checkbox">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :name="name"
      :checked="value"
      @input="$emit('input', id, value)"
    />
    <span class="text">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppCheckbox",
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
    value: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    label: {
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
$fieldIconsPath: "@/assets/icons/fields/";

.app-checkbox {
  display: flex;
  position: relative;
  cursor: pointer;
}

[type="checkbox"] {
  appearance: none;

  &:checked ~ .text::before {
    background: url($fieldIconsPath + "checkbox-checked.svg") center center;
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
    background: url($fieldIconsPath + "checkbox-default.svg") center center;
  }
}
</style>
