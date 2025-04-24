import { useQuery } from '@tanstack/react-query'

export const usePosts = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/posts/questions')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    }
  })
  
  return {posts}
}
