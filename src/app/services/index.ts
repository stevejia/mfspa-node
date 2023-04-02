import AppInfoService from "./appInfo/service";
import DebugInfoService from "./debugInfo/service";
import GroupInfoService from "./groupInfo/service";
import MenuInfoService from "./menuInfo/service";
import PageInfoService from "./pageInfo/service";

import ArticleInfoService from "./articleInfo/service";

const appInfoService = new AppInfoService("app_info");

const debugInfoService = new DebugInfoService("debug_info");

const groupInfoService = new GroupInfoService("group_info");

const pageInfoService = new PageInfoService("page_info");

const menuInfoService = new MenuInfoService("menu_info");

const articleInfoService = new ArticleInfoService('article_info');

export {
  appInfoService,
  debugInfoService,
  groupInfoService,
  pageInfoService,
  menuInfoService,
  articleInfoService
};
