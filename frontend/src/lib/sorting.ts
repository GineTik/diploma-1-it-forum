import { AnswerResponse } from "@/types/answers.types";

export const sortByCorrectAnswer = (a: AnswerResponse, b: AnswerResponse) => {
    return b.isCorrect === a.isCorrect ? 0 : a.isCorrect ? -1 : 1;
}