import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import MenuInfoModel, { MenuPageModel } from "./model";

class MenuInfoService extends Mapper<MenuInfoModel> {
  constructor(table_name: string) {
    super(table_name);
  }
  async queryMenuInfo() {
    const conditionQuery = new ConditionalQuery();
    const data = await this.query<MenuInfoModel[]>(
      conditionQuery.getQueryString(this.tableName)
    );
    return data;
  }

  async queryMenuPages(tableName: string) {
    const conditionQuery = new ConditionalQuery();
    const data = await this.query<MenuPageModel[]>(
      conditionQuery.getQueryString(tableName)
    );
    return data;
  }

  async deleteMenuInfo(query: MenuInfoModel) {
    const conditionQuery = new ConditionalQuery();
    conditionQuery.addCondition("pageId", Condition.Equals, query?.menuId);
    await this.query(
      conditionQuery.getQueryString(this.tableName, SQL_OPERATOR.DELETE)
    );
  }
}

export default MenuInfoService;
