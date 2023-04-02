import { Router } from "express";

import { articleInfoService } from "../services";
import jsonResult from "./utils/result";

const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  let { query } = url.parse(req.url, true);
  const articleInfo = await articleInfoService.getArticleInfo(query);
  res.send(jsonResult({ articleInfo }));
});

router.get("/list", async (req, res) => {
  let { query = {} } = url.parse(req.url, true);
  const articleList = await articleInfoService.queryArticleInfo(query);
  res.send(jsonResult({ articleList }));
});

router.post("/update", async (req, res) => {
  const articleInfo = req.body;
  await articleInfoService.insertOrUpdate(articleInfo).catch((reason: any) => {
    res.send(reason);
  });
  res.send(jsonResult(null, null, 0));
});

router.delete("/delete", async (req, res) => {
    let { query: article_info } = url.parse(req.url, true);
    await articleInfoService.delete(article_info);
    res.send(jsonResult());
  });

export default router;
