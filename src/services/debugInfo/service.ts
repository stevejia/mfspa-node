import Mapper, {
  Condition,
  ConditionalQuery,
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
    await this.insert(debugInfo);
  }
}

export default DebugInfoService;
