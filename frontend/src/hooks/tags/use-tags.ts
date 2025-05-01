import { TAGS_SERVICE } from '@/services/tags.service'
import { TagResponse } from '@/types/tags.type'
import { useQuery } from '@tanstack/react-query'

export const useTags = () => {
  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await TAGS_SERVICE.getAll()
  })
  
  return {tags: tags as TagResponse[], isTagsLoading}
}
