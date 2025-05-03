'use client';

import { QuestionList } from "@/components/blocks/questions/question-list";
import { usePersonalQuestions } from "@/hooks/posts/use-questions";

export default function PersonalQuestionsPage() {
    const {questions} = usePersonalQuestions();

    return <div className="container mx-auto p-6 max-w-3xl">
        <QuestionList questions={questions} />
    </div>;
}