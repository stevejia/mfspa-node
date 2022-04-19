import { Router } from "express";

import { appInfoService } from "../services";

const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  let { query } = url.parse(req.url, true);
  const appInfo = await appInfoService.getAppInfo(query);
  res.send({ data: { appInfo } });
});
router.post("/update", async (req, res) => {
  const appInfo = req.body;
  await appInfoService.insertOrUpdate(appInfo);
  res.send("appinfo/update successfully");
});

export default router;
