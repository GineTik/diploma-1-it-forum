import { ARTICLE_SERVICE } from '@/services/articles.service'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

export const useArticles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => await ARTICLE_SERVICE.getAll()
  })
  
  return {
    articles: articles?.data ?? [],
    isArticlesLoading: isLoading
  }
}

export const useArticle = (articleId: number) => {
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: async () => await ARTICLE_SERVICE.getById(articleId)
  })

  return {
    article: article?.data ?? null, 
    isArticleLoading: isLoading
  }
}

export const usePersonalArticles = () => {
  const { userId } = useAuth();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['personalArticles'],
    queryFn: async () => await ARTICLE_SERVICE.getFiltered({
      userId
    }),
    enabled: !!userId
  })

  return {
    articles: articles?.data ?? [],
    isArticlesLoading: isLoading
  } 
}
