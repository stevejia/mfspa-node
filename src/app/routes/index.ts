import { Router } from "express";
import uploadRouter from "./upload";
import appInfoRouter from "./appInfo";
import debugInfoRouter from "./debugInfo";
import groupInfoRouter from "./groupInfo";
import pageInfoRouter from "./pageInfo";
import menuInfoRouter from "./menuInfo";

const router = Router();

router.use("/", uploadRouter);

router.use("/appinfo", appInfoRouter);
router.use("/debuginfo", debugInfoRouter);
router.use("/groupinfo", groupInfoRouter);
router.use("/pageinfo", pageInfoRouter);
router.use("/menuinfo", menuInfoRouter);

export default router;
