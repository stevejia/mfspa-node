interface ArticleInfoModel {
    articleId: number;
    title: string;
    content: string;
    type: number;
    tag: number;
    publishTime: string;
    thumbupCount?: number;
    readCount?: number;
    commentCount?: number;
}

type ArticleInfoQuery = Pick<ArticleInfoModel, 'articleId' | 'title' | 'content' | 'type' | 'tag' | 'publishTime'>;

export {ArticleInfoModel, ArticleInfoQuery};