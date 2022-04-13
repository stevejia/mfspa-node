import AppInfoService from "./appInfo/service";
import DebugInfoService from "./debugInfo/service";

const appInfoService = new AppInfoService("app_info");

const debugInfoService = new DebugInfoService("debug_info");

export { appInfoService, debugInfoService };
