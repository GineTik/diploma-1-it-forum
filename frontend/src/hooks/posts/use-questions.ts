import { QuestionsService } from '@/services/questions.service'
import { Post } from '@/types/posts.types'
import { useQuery } from '@tanstack/react-query'

export const useQuestions = () => {
  const { data: questions = [] } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => await QuestionsService.getAll()
  })
  
  return {questions: questions as Post[]}
}

export const useQuestion = (id: number) => {
  const { data: post = {}, isLoading } = useQuery({
    queryKey: ['questions', id],
    queryFn: async () => await QuestionsService.getOneById(id)
  })
  
  return {
    post: post as Post,
    isPostLoading: isLoading
  }
}