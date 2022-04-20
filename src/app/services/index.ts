import AppInfoService from "./appInfo/service";
import DebugInfoService from "./debugInfo/service";
import GroupInfoService from "./groupInfo/service";

const appInfoService = new AppInfoService("app_info");

const debugInfoService = new DebugInfoService("debug_info");

const groupInfoService = new GroupInfoService("group_info");

export { appInfoService, debugInfoService, groupInfoService };
