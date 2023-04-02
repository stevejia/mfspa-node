import Mapper, {
  Condition,
  ConditionalQuery,
  SQL_OPERATOR,
} from "../../mysql/libs/mapper/mapper";
import MenuInfoModel, { MenuPageModel } from "./model";

interface MenuItem {
  name: string;
  key: string | number;
  url?: string;
  relatedUrls?: string[];
  subMenus?: MenuItem[];
  articleCount?: number;
}

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

  async queryMenus() {
    const menuList = await this.queryMenuInfo();
    const menuPages = await this.queryMenuPages("menu_page");

    const mainMenus = menuList.filter((menu) => !menu.pId);
    const subMenus = menuList.filter((menu) => !!menu.pId);

    const menus = mainMenus.map((mm) => {
      const childMenus = subMenus.filter((menu) => menu.pId === mm.menuId);
      let menuItem: MenuItem = {
        name: mm.menuName || "",
        key: `${mm.menuId}`,
      };
      if (!childMenus.length) {
        menuItem = this.genMenuItem(mm, menuPages);
      } else {
        menuItem.subMenus = childMenus.map((cm) => {
          return this.genMenuItem(cm, menuPages);
        });
      }
      return menuItem;
    });

    return menus;
  }

  private genMenuItem(menu: MenuInfoModel, menuPages: MenuPageModel[]) {
    const menuMatchedPages = menuPages.filter(
      (mp) => mp.menuId === menu.menuId && mp.checked
    );
    const menuDefaultPage = menuMatchedPages.find(
      (mp) => mp.menuId === menu.menuId && mp.checked && mp.isDefault
    );
    const url = menuDefaultPage?.pageUrl;
    const menuRelatedPages = menuMatchedPages.filter((mmp) => !mmp.isDefault);
    const relatedUrls = menuRelatedPages.map((mrp) => mrp.pageUrl);
    const menuItem: MenuItem = {
      name: menu.menuName || "",
      key: `${menu.menuId}`,
      url,
      relatedUrls,
    };
    return menuItem;
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
