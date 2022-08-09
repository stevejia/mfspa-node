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
  async queryAppInfo(
    query: AppInfoQuery = { currentUsed: 1 }
  ): Promise<Array<AppInfoModel>> {
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

    const result = await this.query<AppInfoModel[]>(
      conditionQuery.getQueryString(this.tableName)
    );
    return result;
  }

  async getAppInfo(query: AppInfoQuery = { currentUsed: 1 }) {
    const results = await this.queryAppInfo(query);
    return results?.[0] || null;
  }

  async getAppList(query: AppInfoQuery) {
    const appList = await this.queryAppInfo(query);
    return appList || [];
  }
}

export default AppInfoService;
