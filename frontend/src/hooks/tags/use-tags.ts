import { TagsService } from '@/services/tags.service'
import { Tag } from '@/types/tags.type'
import { useQuery } from '@tanstack/react-query'

export const useTags = () => {
  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await TagsService.getAll()
  })
  
  return {tags: tags as Tag[], isTagsLoading}
}
