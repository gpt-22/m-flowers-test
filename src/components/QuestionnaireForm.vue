<template>
  <form action="">
    <h3 class="form-title">Please answer a few questions</h3>

    <questionnaire-progress-bar :total="totalSteps" :current="step" class="progress-bar" />

    <div class="question">
      <div class="question-text">{{ currentQuestion.text }} {{ questionCounter }}</div>

      <div class="answer-container">
        <div v-for="answer in currentQuestion.answers" :key="answer.id" class="answer">
          <component
            :is="getComponentByFieldType(answer.fieldType)"
            :id="answer.id"
            :value="answer.value"
            :name="currentQuestion.text"
            :label="answer.label"
            @input="onInput(currentQuestion.hasMultipleAnswers, answer)"
          />
        </div>
      </div>
    </div>

    <app-button :disabled="currentAnswers.length === 0" @click="onNextClick">
      {{ primaryButtonText }}
    </app-button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { AppButton, AppCheckbox, AppRadioButton, AppTextarea } from "@/components/ui";
import QuestionnaireProgressBar from "@/components/QuestionnaireProgressBar.vue";
import data from "./questions.json";

/* TODO:
 * + save answers
 * + progress bar
 * render nested fields
 * disable textarea in 3, 4 question
 * */

type FieldType = "radio" | "checkbox" | "textarea";

type Answer = {
  id: number;
  label: string;
  value: string | boolean;
  fieldType: FieldType;
  nextQuestionId: number | null;
  answers?: Answer[];
};

type Question = {
  id: number;
  step: number;
  text: string;
  answers: Answer[];
  hasMultipleAnswers?: boolean;
};

interface Data {
  step: number;
  currentQuestion: Question;
  currentAnswers: Answer[];
  form: Map<Question, Answer[]>;
}

const questions: Question[] = data as Question[];

function getCurrentAnswersByQuestion(question: Question): Answer[] {
  return question.answers.filter((answer: Answer) => Boolean(answer.value));
}

export default Vue.extend({
  name: "QuestionnaireForm",
  components: { AppButton, AppRadioButton, QuestionnaireProgressBar },
  data: function (): Data {
    return {
      step: questions[0].step,
      currentQuestion: questions[0],
      currentAnswers: getCurrentAnswersByQuestion(questions[0]),
      form: new Map(),
    };
  },
  computed: {
    hasNextQuestion(): boolean {
      return !this.currentAnswers.every((answer) => answer.nextQuestionId === null);
    },
    primaryButtonText(): string {
      return this.hasNextQuestion ? "Next" : "Save";
    },
    totalSteps(): number {
      return new Set(questions.map((question) => question.step)).size;
    },
    questionCounter(): string {
      return `(${this.step + 1}/${this.totalSteps})`;
    },
  },
  methods: {
    getComponentByFieldType(type: FieldType) {
      switch (type) {
        case "checkbox":
          return AppCheckbox;
        case "radio":
          return AppRadioButton;
        case "textarea":
          return AppTextarea;
        default:
          throw new Error(`Нет компонента для данного типа поля (тип ${type})`);
      }
    },
    onNextClick() {
      if (this.hasNextQuestion) this.switchQuestion();
      else this.saveFormData();
    },
    switchQuestion() {
      this.form.set(this.currentQuestion, this.currentAnswers);
      this.step++;
      this.currentQuestion = questions.find((question) => question.id === this.currentAnswers[0].nextQuestionId);
      this.currentAnswers = getCurrentAnswersByQuestion(this.currentQuestion);
    },
    saveFormData() {
      console.log("save");
    },
    onInput(hasMultipleAnswers: boolean, answer: Answer) {
      if (hasMultipleAnswers) {
        const answerByValueAdded = Boolean(this.currentAnswers.find((currentAnswer) => currentAnswer.id === answer.id));
        if (!answerByValueAdded) {
          this.currentAnswers.push(answer);
        }
      } else {
        this.currentAnswers = [answer];
      }
    },
  },
});
</script>

<style scoped lang="scss">
.form-title {
  margin-bottom: 50px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}

.progress-bar {
  margin-bottom: 22px;
}

.question {
  margin-bottom: 30px;
}

.question-text {
  margin-bottom: 30px;
}

.answer-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
