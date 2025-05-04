import { ARTICLE_SERVICE } from '@/services/articles.service'
import { useQuery } from '@tanstack/react-query'

export const useArticles = () => {
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => await ARTICLE_SERVICE.getAll()
  })
  
  return {articles: articles?.data ?? []}
}

export const useArticle = (articleId: number) => {
  const { data: article, isLoading } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: async () => await ARTICLE_SERVICE.getById(articleId)
  })

  return {
    article: article?.data ?? null, 
    isArticleLoading: isLoading
  }
}
