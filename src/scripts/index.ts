import start from "./tools/start";
import upload from "./tools/upload";

const args = process.argv;

const isUpload = args.indexOf("--upload") > -1;
if (isUpload) {
  upload();
} else {
  start();
}
