'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { QuestionItem, QuestionItemProps } from "@/components/blocks/questions/question-item";
import { usePosts } from "@/hooks/use-posts";

interface QuestionListProps {
  questions: QuestionItemProps[];
  className?: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {questions.map((question, index) => (
        <QuestionItem key={index} {...question} />
      ))}
    </div>
  );
};

export default function QuestionsPage() {
  const {posts} = usePosts();

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <QuestionList questions={posts} />
    </div>
  );
}
