import { Router } from "express";
import uploadRouter from "./upload";
import appInfoRouter from "./appInfo";
import debugInfoRouter from "./debugInfo";
import groupInfoRouter from "./groupInfo";
const router = Router();

router.use("/", uploadRouter);

router.use("/appinfo", appInfoRouter);
router.use("/debuginfo", debugInfoRouter);
router.use("/groupinfo", groupInfoRouter);

export default router;
