import { Answer } from "@/types/answers.types";

export const sortByCorrectAnswer = (a: Answer, b: Answer) => {
    return b.isCorrect === a.isCorrect ? 0 : a.isCorrect ? -1 : 1;
}