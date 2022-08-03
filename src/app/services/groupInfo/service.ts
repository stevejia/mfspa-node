import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import GroupInfoModel from "./model";

class GroupInfoService extends Mapper<GroupInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryGroupInfo() {
    const conditionQuery = new ConditionalQuery();

    const data = await this.query(
      conditionQuery.getQueryString(this.tableName, SQL_OPERATOR.QUERY, {
        tableName: "page_info",
        foreignKey: "groupId",
        queryAttrs: [{ key: "pageCount", condition: "count(*)" }],
      })
    );
    return data;
  }
  async deleteGroupInfo(query: GroupInfoModel) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition("groupId", Condition.Equals, query?.groupId);
    await this.query(
      conditionQuery.getQueryString(this.tableName, SQL_OPERATOR.DELETE)
    );
  }
}

export default GroupInfoService;
