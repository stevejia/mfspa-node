import Mapper, {
  Condition,
  ConditionalQuery,
} from "../../mysql/libs/mapper/mapper";
import { ArticleInfoModel, ArticleInfoQuery } from "./types";

class ArticleInfoService extends Mapper<ArticleInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryArticleInfo(
    query?: ArticleInfoQuery
  ): Promise<Array<ArticleInfoModel>> {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition(
      "articleId",
      Condition.Equals,
      query?.articleId
    );
    conditionQuery.addCondition("title", Condition.Contains, query?.title);

    conditionQuery.addCondition("content", Condition.Contains, query?.content);
    conditionQuery.addCondition("type", Condition.Equals, query?.type);
    conditionQuery.addCondition("tag", Condition.Equals, query?.tag);
    conditionQuery.addCondition(
      "publishTime",
      Condition.Equals,
      query?.publishTime
    );
    const result = await this.query<ArticleInfoModel[]>(
      conditionQuery.getQueryString(this.tableName)
    );
    return result;
  }

  async getArticleInfo(query: ArticleInfoQuery) {
    const results = await this.queryArticleInfo(query);
    return results?.[0] || null;
  }

  async getArticleList(query: ArticleInfoQuery) {
    const list = await this.queryArticleInfo(query);
    return list || [];
  }
}

export default ArticleInfoService;
