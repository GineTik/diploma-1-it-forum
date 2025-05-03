import { QUESTIONS_SERVICE } from '@/services/questions.service'
import { PostResponse } from '@/types/posts.types'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

export const useQuestions = () => {
  const { data: questions = [] } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => await QUESTIONS_SERVICE.getAll()
  })
  
  return {questions: questions as PostResponse[]}
}

export const usePersonalQuestions = () => {
  const {userId} = useAuth();

  const { data: questions = [] } = useQuery({
    queryKey: ['questions', 'personal', userId],
    queryFn: async () => await QUESTIONS_SERVICE.getFiltered({userId})
  })
    
  return {questions: questions as PostResponse[]}
}


export const useQuestion = (id: number) => {
  const { data: post = {}, isLoading } = useQuery({
    queryKey: ['questions', id],
    queryFn: async () => await QUESTIONS_SERVICE.getOneById(id)
  })
  
  return {
    post: post as PostResponse,
    isPostLoading: isLoading
  }
}