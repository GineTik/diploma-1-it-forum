'use client'

import React from "react";
import { useQuestions } from "@/hooks/posts/use-questions";
import { QuestionList } from "@/components/blocks/questions/question-list";

export default function QuestionsPage() {
  const {questions} = useQuestions();

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <QuestionList questions={questions} />
    </div>
  );
}
