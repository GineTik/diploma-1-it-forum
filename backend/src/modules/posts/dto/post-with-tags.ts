import { Post, Tag } from "generated/prisma"

export type PostWithTags = Post & {
    tags: Tag[]
}