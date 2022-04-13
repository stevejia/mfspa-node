
import express from "express";
import mime from "mime";
import { debugInfoService } from "./services";

const app = express();

//设置跨域访问
app.all("*", (req, res, next) => {
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
  next();
});

app.get("/api/v1/debugInfo/get", async (req, res) => {
  const debugInfo = await debugInfoService.queryDebugInfo();
  res.send(debugInfo);
});

app.listen(8044);
console.log("node server is running at port 8044");
