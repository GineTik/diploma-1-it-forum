import { useQuery } from '@tanstack/react-query'

export const useArticles = () => {

  const { data: articles = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/posts/articles')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    }
  })
  
  return {articles}
}
