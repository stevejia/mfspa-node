// import compressing from "compressing";
const compressing = require("compressing");
import { Router } from "express";
import jsonResult from "./utils/result";
// import fs from "fs";
const fs = require("fs");
// import multiparty from "multiparty";
const multiparty = require("multiparty");
// import path from "path";
const path = require("path");
const router = Router();

const cwd = process.cwd();

router.post("/server/upload", (req, res) => {
  upload(req, res);
});

router.post("/app/upload", (req, res) => {
  upload(req, res);
});

router.post("/node/upload", (req, res) => {
  upload(req, res, true);
});

const upload = (req: any, res: any, override: boolean = false) => {
  const form = new multiparty.Form();
  form.parse(req, (err: any, fields: any, files: any) => {
    const {
      data: [_data],
      path: [_path],
    } = fields;
    const absolutePath = path.resolve(cwd, _path);
    // 判断文件夹是否存在, 不存在创建一个
    if (dirExist(absolutePath, override)) {
      res.send("版本冲突了已存在");
      return;
    }
    const bufferStream = Buffer.from(_data, "base64");
    compressing.zip.uncompress(bufferStream, absolutePath, function () {
      console.log("uncompress success");
    });
    res.send(jsonResult());
  });
};

const dirExist = (folderPath: string, override: boolean) => {
  const paths = folderPath.replace(/\\/g, "/").split("/");
  let dir = "";
  let dirExist = true;
  paths.forEach((dirName) => {
    dir += `${dirName}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      dirExist = false;
    }
  });
  return !override && dirExist;
};

export default router;
