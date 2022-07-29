<template>
  <form action="">
    <h3 class="form-title">Please answer a few questions</h3>

    <questionnaire-progress-bar :total="totalSteps" :current="step" class="progress-bar" />

    <div v-if="currentQuestion" class="question">
      <div class="question-text">{{ currentQuestion.text }} {{ questionCounter }}</div>

      <div class="answer-container">
        <div v-for="answer in currentQuestion.answers" :key="answer.id" class="answer">
          <component
            :is="getComponentByFieldType(answer.fieldType)"
            :id="answer.id"
            v-model="answer.value"
            :name="currentQuestion.text"
            :label="answer.label"
            :disabled="answer.disabled"
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
import QuestionnaireProgressBar from "./QuestionnaireProgressBar.vue";

import { axiosInstance } from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import { Answer, FieldType, Question } from "../types/Question";

/* TODO:
 * + save answers
 * + progress bar
 * + get question from server
 * save answers on server
 * + disable textarea in 3, 4, 5, 6 question
 * + reactive disable
 * + bug: primaryButtonText
 * */

const fieldIdDisabledMap = new Map([
  [9, (answers: Answer[]) => answers.find((answer) => answer.id === 10)?.value === true],
  [11, (answers: Answer[]) => answers.find((answer) => answer.id === 12)?.value === true],
  [17, (answers: Answer[]) => answers.find((answer) => answer.id === 16)?.value === false],
  [18, (answers: Answer[]) => answers.find((answer) => answer.id === 19)?.value === true],
]);

interface Data {
  questions: Question[];
  currentQuestion: Question | null;
  step: number;
  currentAnswers: Answer[];
  form: Map<Question, Answer[]>;
}

export default Vue.extend({
  name: "QuestionnaireForm",
  components: { AppButton, QuestionnaireProgressBar },
  data: function (): Data {
    return {
      questions: [],
      step: -1,
      currentQuestion: null,
      currentAnswers: [],
      form: new Map(),
    };
  },
  computed: {
    hasNextQuestion(): boolean {
      let lastStep = -1;
      this.questions.forEach((question) => (lastStep = question.step > lastStep ? question.step : lastStep));
      return this.step < lastStep;
    },
    primaryButtonText(): string {
      return this.hasNextQuestion ? "Next" : "Save";
    },
    totalSteps(): number {
      return new Set(this.questions.map((question) => question.step)).size;
    },
    questionCounter(): string {
      return `(${this.step + 1}/${this.totalSteps})`;
    },
  },
  watch: {
    questions: {
      handler() {
        this.setDisabled();
      },
      deep: true,
    },
  },
  created(): void {
    axiosInstance
      .get("questions")
      .then((response: AxiosResponse) => {
        this.questions = response.data as Question[];
        this.setDisabled();
        this.currentQuestion = this.questions[0];
        this.step = this.currentQuestion.step;
        this.currentAnswers = this.getCurrentAnswersByQuestion();
      })
      .catch(() => {
        console.error("Ошибка при запросе списка вопросов");
      });
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

    getCurrentAnswersByQuestion(): Answer[] {
      return this.currentQuestion.answers.filter((answer: Answer) => Boolean(answer.value));
    },

    getIsAnswerFieldDisabled(answerId: number, answers: Answer[]): boolean {
      const getDisabledFunction = fieldIdDisabledMap.get(answerId);
      if (getDisabledFunction) return getDisabledFunction(answers);

      return false;
    },

    setDisabled() {
      this.questions.forEach((q) => {
        q.answers.forEach((a) => {
          a.disabled = this.getIsAnswerFieldDisabled(a.id, q.answers);
        });
      });
    },

    onNextClick(): void {
      if (this.hasNextQuestion) this.switchQuestion();
      else this.saveFormData();
    },

    switchQuestion(): void {
      this.form.set(this.currentQuestion, this.currentAnswers);
      this.step++;
      this.currentQuestion = this.questions.find(
        (question: Question) => question.id === this.currentAnswers[0].nextQuestionId
      );
      this.currentAnswers = this.getCurrentAnswersByQuestion();
    },

    saveFormData() {
      console.log("save");
    },

    onInput(hasMultipleAnswers: boolean, answer: Answer): void {
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
