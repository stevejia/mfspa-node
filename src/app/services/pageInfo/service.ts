import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import PageInfoModel from "./model";
import PageInfoQuery from "./query";

class PageInfoService extends Mapper<PageInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryPageInfo(query: PageInfoQuery) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition('groupId', Condition.Equals, query.groupId);
    const data = await this.query<PageInfoModel[]>(
      conditionQuery.getQueryString(this.tableName)
    );
    return data;
  }
  async deletePageInfo(query: PageInfoModel) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition("pageId", Condition.Equals, query?.pageId);
    await this.query(
      conditionQuery.getQueryString(this.tableName, SQL_OPERATOR.DELETE)
    );
  }
}

export default PageInfoService;
