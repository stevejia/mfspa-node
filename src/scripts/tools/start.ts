// import express from "express";
const express = require("express");
// import mime from "mime";
import router from "../../app/routes";
const bodyParser = require("body-parser");
const start = () => {
  const app = express();
  app.use(bodyParser.json()); //数据JSON类型
  app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

  //设置跨域访问
  app.all("*", (req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json");
    res.header("Accept", "application/json");
    next();
  });
  app.use("/api/v1", router);
  app.listen(8044);
  console.log("node server is running at port 8044");
};

export default start;
