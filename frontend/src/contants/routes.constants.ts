class Routes {
    HOME = "/";
    QUESTIONS = "/questions";
    TAGS = "/tags";
    ARTICLES = "/articles";
    QUESTIONS_FORM = "/questions/form";
    ARTICLES_FORM = "/articles/form";
    PERSONAL_QUESTIONS = "/questions/personal";
    PERSONAL_ARTICLES = "/articles/personal";
    QUESTION = (id: number) => `/questions/${id}`;
    ARTICLE = (id: number) => `/articles/${id}`;
}

export const ROUTES = new Routes();