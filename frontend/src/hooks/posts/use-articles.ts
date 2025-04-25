import { ArticlesService } from '@/services/articles.service'
import { useQuery } from '@tanstack/react-query'

export const useArticles = () => {

  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => await ArticlesService.getAllArticles()
  })
  
  return {articles}
}
