import * as compressing from "compressing";
// const compressing = require("compressing");
import { Router } from "express";
import jsonResult from "./utils/result";
import * as fs from "fs";
// const fs = require("fs");
// import multiparty from "multiparty";
const multiparty = require("multiparty");
// import path from "path";
const path = require("path");
const router = Router();

const cwd = process.cwd();
// const zlib = require("zlib");
// import zlib, { unzip } from "zlib";
// import { ReadStream } from "fs";
import * as stream from 'stream';
const Readable = stream.Readable;
// import stream, { Readable } from "stream";
router.post("/server/upload", (req, res) => {
  upload(req, res);
});

router.post("/app/upload", (req, res) => {
  upload(req, res);
});

router.post("/node/upload", (req, res) => {
  console.log("node upload");
  upload(req, res, true);
});

const upload = (req: any, res: any, override: boolean = false) => {
  const form = new multiparty.Form();
  form.parse(req, async (err: any, fields: any, files: any) => {
    console.log(fields);
    const {
      data: [_data],
      path: [_path],
    } = fields;
    const absolutePath = path.resolve(cwd, _path);
    //判断文件夹是否存在, 不存在创建一个
    if (dirExist(absolutePath, override)) {
      res.send("版本已存在,请尝试修改版本号后重新发布");
      return;
    }
    const bufferStream = await getBuffer(_data);
    const readStream = new stream.PassThrough();
    const zipStream = readStream.end(bufferStream).read();
    console.log(absolutePath, "absolutePath");
    await compressing.zip
      .uncompress(zipStream, absolutePath)
      .catch((reason) => console.log(reason));
    res.send(jsonResult());
  });
};

const getBuffer = async (data: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    const buffer = Buffer.from(data, "base64");
    setTimeout(() => {
      resolve(buffer);
    }, 1000);
  }).catch((reason) => {
    throw reason;
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
