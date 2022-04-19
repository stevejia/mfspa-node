import { Router } from "express";

import { debugInfoService } from "../services";
const router = Router();
router.get("/get", async (req, res) => {
  const debugInfo = await debugInfoService.queryDebugInfo();
  res.send({ data: { debugInfo } });
});
router.delete("/delete", async (req, res) => {
  console.log(req.body);
  const appInfo = req.body;
  await debugInfoService.deleteDebugInfo(appInfo);
  res.send("debuginfo/delete");
});

export default router;
