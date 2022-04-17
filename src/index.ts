// import express from "express";
const express = require("express");
const mime = require("mime");
// import mime from "mime";
import router from "./routes/index";
const bodyParser = require("body-parser");
const path = require("path");
const cwd = process.cwd();

const app = express();

app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

//设置跨域访问
app.all("*", (req: any, res: any, next: any) => {
  const { path: urlPath } = req;
  const isHmr = urlPath?.indexOf("__webpack_hmr") > -1;
  const mimeType = mime.getType(urlPath);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  // if (isHmr) {
  //   res.header("Content-Type", "text/event-stream");
  // } else {
  //   if (!!mimeType) {
  //     res.header("Content-Type", `${mimeType};"charset=utf-8"`);
  //   } else {
  //     res.header("Content-Type", "text/html");
  //   }
  // }

  if (req.method == "POST") {
    res.header("Content-Type", "application/json");
    res.header("Accept", "application/json");
  }
  res.header("Content-Type", "application/json");
  res.header("Accept", "application/json");
  next();
});

app.use("/api/v1", router);

// app.get("/api/v1/debugInfo/get", async (req, res) => {
//   const debugInfo = await debugInfoService.queryDebugInfo();
//   res.send({ data: { debugInfo } });
// });

// app.post("/api/v1/file/upload", async (req, res) => {
//   console.log(req.body);

//   const form = new multiparty.Form({ uploadDir: cwd });
//   form.parse(req, (err, fields, files) => {
//     const {
//       zipStream: [zStream],
//       appName: [_appName],
//       version: [_version],
//     } = fields;
//     const uploadDist = path.resolve(cwd, `../mfspaClient`);

//     // 判断文件夹是否存在, 不存在创建一个
//     if (dirExist(uploadDist, "app", _appName, _version)) {
//       res.send("版本冲突了已存在");
//       return;
//     }

//     const bufferStream = Buffer.from(zStream, "base64");

//     const unzipPath = path.resolve(uploadDist, "app", _appName, _version);

//     compressing.zip.uncompress(bufferStream, unzipPath, function () {
//       console.log("uncompress success");
//     });
//     res.send("upload succesfully");
//   });

//   // const st = Buffer.from(zipStream, "base64");
//   // const rs = new stream.PassThrough();
//   // rs.end(st);
//   // rs.pipe(fs.createWriteStream(path.join(uploadDist, "mfspa.zip")));

//   // compressing.zip.uncompress(st, uploadDist, function () {
//   //   console.log("uncompress success");
//   // });
// });

// const dirExist = (...paths: Array<string>) => {
//   let dir = "";
//   let dirExist = true;
//   paths.forEach((dirName) => {
//     dir = path.resolve(dir, dirName);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//       dirExist = false;
//     }
//   });
//   return dirExist;
// };

app.listen(8044);
console.log("node server is running at port 8044");
