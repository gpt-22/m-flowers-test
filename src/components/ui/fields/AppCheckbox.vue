<template>
  <label class="app-checkbox">
    <input
      type="checkbox"
      v-model="model"
      :value="value"
      :id="id"
      :name="name"
      :checked="value"
      @input="$emit('input', value)"
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
  computed: {
    model: {
      get: function () {
        return this.value;
      },
      set: function (val: boolean) {
        this.$emit("input", val);
      },
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
  user-select: none;

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
