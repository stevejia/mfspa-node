import { Router } from "express";

import { pageInfoService } from "../services";
import jsonResult from "./utils/result";
const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  let { query } = url.parse(req.url, true);
  const pageList = await pageInfoService.queryPageInfo(query);
  res.send(jsonResult({ pageList }));
});
router.delete("/delete", async (req, res) => {
  let { query: pageInfo } = url.parse(req.url, true);
  await pageInfoService.deletePageInfo(pageInfo);
  res.send(jsonResult());
});

router.post("/update", async (req, res) => {
  const pageInfo = req.body;
  await pageInfoService.insertOrUpdate(pageInfo);
  res.send(jsonResult());
});

export default router;
