<template>
  <div class="progress-bar">
    <div v-for="(dot, index) in total" :key="dot" class="dot-container">
      <div class="dot" :class="{ active: index <= current }" />
      <div v-if="dot !== total" class="dot-bar" :class="{ passed: index < current }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "QuestionnaireProgressBar",
  props: {
    total: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.progress-bar {
  display: flex;
}

.dot-container {
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    flex-grow: 1;
  }
}

.dot {
  width: 21px;
  height: 21px;
  background: #c4c4c4;
  border: 2px solid #b3b3b3;
  border-radius: 50%;

  &.active {
    background: #8cd6ff;
    border: 2px solid $color-primary;
  }
}

.dot-bar {
  flex-grow: 1;
  height: 3px;
  background-color: #b3b3b3;

  &.passed {
    background-color: $color-primary;
  }
}
</style>
