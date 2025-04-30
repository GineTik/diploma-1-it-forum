import { ARTICLE_SERVICE } from '@/services/articles.service'
import { Post } from '@/types/posts.types'
import { useQuery } from '@tanstack/react-query'

export const useArticles = () => {
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => await ARTICLE_SERVICE.getAllArticles() as unknown as Post[]
  })
  
  return {articles}
}
