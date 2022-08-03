import { Router } from "express";

import { appInfoService } from "../services";
import jsonResult from "./utils/result";

const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  let { query } = url.parse(req.url, true);
  const appInfo = await appInfoService.getAppInfo(query);
  res.send({ data: { appInfo } });
  res.send(jsonResult({ appInfo }));
});
router.post("/update", async (req, res) => {
  const appInfo = req.body;
  await appInfoService.insertOrUpdate(appInfo).catch((reason: any) => {
    res.send(reason);
  });
  res.send(jsonResult(null, null, 0));
});

export default router;
