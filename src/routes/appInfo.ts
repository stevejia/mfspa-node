import { Router } from "express";

import { appInfoService } from "../services";
const router = Router();
router.get("/get", async (req, res) => {
  const result = appInfoService.queryAppInfo();
  console.log(result);
  res.send("appinfo/get");
});
router.post("/update", async (req, res) => {
  console.log(req.body);
  const appInfo = req.body;
  await appInfoService.addAppInfo(appInfo);
  res.send("appinfo/update");
});

export default router;
