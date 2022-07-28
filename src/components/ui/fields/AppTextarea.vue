<template>
  <textarea
    :id="id"
    :value="value"
    :cols="cols"
    :rows="rows"
    class="app-textarea"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppTextarea",
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cols: {
      type: [Number, String],
      default: 20,
    },
    rows: {
      type: [Number, String],
      default: 3,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.app-textarea {
  min-width: 260px;
  padding: 9px;
  border-radius: 5px;
  background-color: #f5f5f5;
  font: 400 12px "Roboto Mono";
  line-height: 18px;
  border: 2px solid #b3b3b3;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    //background-color: darken($color-primary, 5);
  }

  &:focus {
    //outline-offset: 2px;
    //outline: 2px solid darken($color-primary, 10);
  }

  &:active {
    //background-color: darken($color-primary, 20);
  }

  &:disabled {
    //background-color: #e6e6e6;
    //color: darken(#e6e6e6, 10);
  }
}
</style>
