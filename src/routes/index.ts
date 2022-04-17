import { Router } from "express";
import uploadRouter from "./upload";
import appInfoRouter from "./appInfo";
const router = Router();

router.use("/", uploadRouter);

router.use("/appinfo", appInfoRouter);

export default router;
