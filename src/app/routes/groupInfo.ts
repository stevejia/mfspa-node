import { Router } from "express";

import { groupInfoService } from "../services";
import jsonResult from "./utils/result";
const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  const groupInfo = await groupInfoService.queryGroupInfo();
  res.send(jsonResult({ groupInfo }));
});
router.delete("/delete", async (req, res) => {
  let { query: groupInfo } = url.parse(req.url, true);
  await groupInfoService.deleteGroupInfo(groupInfo);
  res.send(jsonResult());
});

router.post("/update", async (req, res) => {
  const groupInfo = req.body;
  await groupInfoService.insertOrUpdate(groupInfo);
  res.send(jsonResult());
});

export default router;
