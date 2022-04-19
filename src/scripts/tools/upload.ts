import { resolve } from "path";

const fs = require("fs");

const path = require("path");
const JSZip = require("jszip");
const FormData = require("form-data");
const request = require("request");
import mfspaConfig from "../../mfspa.config";
const zip = new JSZip();
const cwd = process.cwd();
const sourceDir = "./dist";
const sourcePath = path.resolve(cwd, sourceDir);
const upload = () => {
  return new Promise(async (resolve, reject) => {
    markIndex();
    readDir(sourcePath);
    const data = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    });
    const formData = new FormData();
    formData.append("data", data);
    formData.append("path", "./dist");

    const headers = formData.getHeaders();
    // const headers = `multipart/form-data;`;
    const url = `${mfspaConfig.nodeHost}api/v1/node/upload`;
    console.log(url);
    request(
      {
        url,
        method: "POST",
        headers,
        // headers: { "content-type": `application/json` },
        body: formData,
      },
      (err: any, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(response);
        resolve(response);
      }
    );
  });
};

const readDir = (curPath: string) => {
  let files = fs.readdirSync(curPath);
  if (files.length > 0) {
    files.forEach((fileName: string) => {
      const filePath = path.join(curPath, fileName);
      const fileStat = fs.statSync(filePath);
      const relativePath = getRelativePath(sourcePath, filePath);
      if (fileStat.isDirectory()) {
        zip.folder(relativePath);
        readDir(filePath);
        return;
      }
      zip.file(relativePath, fs.readFileSync(filePath));
    });
  }
};

const getRelativePath = (baseDir: string, fullPath: string) => {
  return fullPath.split(baseDir)[1];
};

const markIndex = () => {
  const distIndexPath = path.resolve(cwd, "./dist/scripts/index.js");
  const distIndexContent = fs.readFileSync(distIndexPath, "utf-8");
  const allLines = distIndexContent.split(/\r?\n/);
  const orginLines = allLines.filter(
    (line: string) => line.indexOf("mfspa node server last upload time") === -1
  );
  orginLines.push(
    `// mfspa node server last upload time: ${new Date().getTime()}`
  );
  const newContent = orginLines.join("\r\n");
  fs.writeFileSync(distIndexPath, newContent, "utf-8");
};

export default upload;
