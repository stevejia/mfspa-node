import Mapper, {
  Condition,
  ConditionalQuery,
} from "../../mysql/libs/mapper/mapper";
import AppInfoModel from "./model";
import AppInfoQuery from "./query";

class AppInfoService extends Mapper<AppInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryAppInfo(query: AppInfoQuery = { currentUsed: 1 }) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition("appId", Condition.Equals, query?.appId);
    conditionQuery.addCondition("appName", Condition.Equals, query?.appName);
    conditionQuery.addCondition(
      "appVersion",
      Condition.Equals,
      query?.appVersion
    );
    conditionQuery.addCondition(
      "currentUsed",
      Condition.Equals,
      query?.currentUsed
    );

    debugger;
    await this.query(conditionQuery.getQueryString(this.tableName));
  }

  async addAppInfo(appInfo: AppInfoModel | Array<AppInfoModel>) {
    await this.insert(appInfo);
  }
}

export default AppInfoService;
