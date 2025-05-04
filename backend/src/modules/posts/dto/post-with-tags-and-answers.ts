import { Answer, Post, Tag } from "generated/prisma"

export type PostWithTagsAndAnswers = Post & {
    tags: Tag[]
    answers: Answer[]
}
