export type FieldType = "radio" | "checkbox" | "textarea";

export type Answer = {
  id: number;
  label: string;
  value: string | boolean;
  fieldType: FieldType;
  nextQuestionId: number | null;
  disabled: boolean;
  answers?: Answer[];
};

export type Question = {
  id: number;
  step: number;
  text: string;
  answers: Answer[];
  hasMultipleAnswers?: boolean;
};
