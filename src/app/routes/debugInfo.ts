import { Router } from "express";

import { debugInfoService } from "../services";
import jsonResult from "./utils/result";
const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  const debugInfo = await debugInfoService.queryDebugInfo();
  res.send(jsonResult({ debugInfo }));
});
router.delete("/delete", async (req, res) => {
  let { query: debugInfo } = url.parse(req.url, true);
  await debugInfoService.deleteDebugInfo(debugInfo);
  res.send(jsonResult());
});

router.post("/update", async (req, res) => {
  const debugInfo = req.body;
  await debugInfoService.insertOrUpdate(debugInfo);
  res.send(jsonResult());
});

export default router;
