import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import DebugInfoModel from "./model";
import DebugInfoQuery from "./query";

class DebugInfoService extends Mapper<DebugInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryDebugInfo() {
    const conditionQuery = new ConditionalQuery();
    const data = await this.query(
      conditionQuery.getQueryString(this.tableName)
    );
    return data;
  }

  async addDebugInfo(debugInfo: DebugInfoModel | Array<DebugInfoModel>) {
    await this.insertOrUpdate(debugInfo);
  }
  async deleteDebugInfo(query: DebugInfoModel) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition("appName", Condition.Equals, query?.appName);
    await this.query(
      conditionQuery.getQueryString(this.tableName, SQL_OPERATOR.DELETE)
    );
  }
}

export default DebugInfoService;
