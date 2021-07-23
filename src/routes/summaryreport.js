import { Router } from "express";
import { pdfUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/summaryreport";
import { validationMid } from "../middleware/validation";
import SummaryReportController from "./../controller/summaryreportcontroller";

const router = Router();

router.get("/", SummaryReportController.summaryReport);
router.get("/all", SummaryReportController.index);
router.get("/:id/download", SummaryReportController.download);
router.get("/:slug", SummaryReportController.show);

router.post(
  "/",
  authenticateToken,
  pdfUpload.single("pdf_link"),
  createValidation,
  validationMid,
  SummaryReportController.save
);
router.put(
  "/:id",
  authenticateToken,
  pdfUpload.single("pdf_link"),
  updateValidation,
  validationMid,
  SummaryReportController.update
);
router.delete("/:id", authenticateToken, SummaryReportController.destroy);

export default router;
