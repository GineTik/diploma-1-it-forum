class Routes {
    HOME = "/";
    QUESTIONS = "/questions";
    TAGS = "/tags";
    ARTICLES = "/articles";
    QUESTIONS_FORM = "/questions/form";
    ARTICLES_FORM = "/articles/form";
    QUESTION = (id: number) => `/questions/${id}`;
}

export const ROUTES = new Routes();