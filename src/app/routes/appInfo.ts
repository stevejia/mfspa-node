import { Router } from "express";

import { appInfoService } from "../services";
import AppInfoModel from "../services/appInfo/model";
import jsonResult from "./utils/result";

const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  let { query } = url.parse(req.url, true);
  const appInfo = await appInfoService.getAppInfo(query);
  // res.send({ data: { appInfo } });
  res.send(jsonResult({ appInfo }));
});

router.get("/list", async (req, res) => {
  let { query = {} } = url.parse(req.url, true);
  const appVersionList = await appInfoService.getAppList(query);
  const appList = getAppList(appVersionList);
  res.send(jsonResult({ appList }));
});

router.post("/publish", async (req, res) => {
  const { appName, version } = req.body;
  const appList = await appInfoService.getAppList({ appName });
  const currentApp = appList.find((app) => !!app.currentUsed);
  const publishApp = appList.find((app) => app.appVersion === version);
  const updateApps = [];
  if (currentApp) {
    currentApp.currentUsed = 0;
    updateApps.push(currentApp);
  }

  if (publishApp) {
    publishApp.currentUsed = 1;
    updateApps.push(publishApp);
  }
  await appInfoService.insertOrUpdate(updateApps);
  res.send(jsonResult());
});

const getAppList = (appVersionList: AppInfoModel[]) => {
  const appList: Array<any> = [];
  appVersionList = appVersionList.sort((a, b) => {
    return (b.appId || 0) - (a.appId || 0);
  });
  appVersionList.forEach((avi) => {
    let item = appList.find((app) => app.appName === avi.appName);
    if (!item) {
      let publishedVersions = appVersionList.filter(
        (avitem) => avitem.appName === avi.appName
      );
      let currentUsed = publishedVersions.find((fitem) => !!fitem.currentUsed);
      item = {
        appId: avi.appId,
        appName: avi.appName,
        currentVersion: currentUsed?.appVersion,
        publishedVersions,
      };
      appList.push(item);
    }
  });
  return appList;
};

router.post("/update", async (req, res) => {
  const appInfo = req.body;
  await appInfoService.insertOrUpdate(appInfo).catch((reason: any) => {
    res.send(reason);
  });
  res.send(jsonResult(null, null, 0));
});

export default router;
