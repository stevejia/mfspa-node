import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import PageInfoModel from "./model";

class PageInfoService extends Mapper<PageInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryPageInfo() {
    const conditionQuery = new ConditionalQuery();
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
