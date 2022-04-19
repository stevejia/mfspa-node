import { Router } from "express";
import uploadRouter from "./upload";
import appInfoRouter from "./appInfo";
import debugInfoRouter from "./debugInfo";
const router = Router();

router.use("/", uploadRouter);

router.use("/appinfo", appInfoRouter);
router.use("/debuginfo", debugInfoRouter);

export default router;
