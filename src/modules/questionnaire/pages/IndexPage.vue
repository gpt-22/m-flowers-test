<template>
  <div>
    <app-dialog>
      <questionnaire-form />
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AppDialog } from "@/components/ui";
import QuestionnaireForm from "../components/QuestionnaireForm.vue";

export default Vue.extend({
  name: "IndexPage",
  components: {
    AppDialog,
    QuestionnaireForm,
  },
});
</script>
