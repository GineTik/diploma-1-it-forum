import { Tag } from '@/types/tags.type'
import { useQuery } from '@tanstack/react-query'

export const useTags = () => {
  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/tags')
      if (!response.ok) {
        throw new Error('Failed to fetch tags')
      }
      return response.json()
    }
  })
  
  return {tags: tags as Tag[], isTagsLoading}
}
