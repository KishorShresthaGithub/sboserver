import { Router } from "express";
import { pdfUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import SummaryReportController from "./../controller/SummaryReportcontroller";

const router = Router();

router.get("/", SummaryReportController.summaryReport);
router.get("/all", SummaryReportController.index);
router.get("/:slug", SummaryReportController.show);

router.post(
  "/",
  authenticateToken,
  pdfUpload.single("pdf_link"),
  SummaryReportController.save
);
router.put(
  "/:slug",
  authenticateToken,
  pdfUpload.single("pdf_link"),
  SummaryReportController.update
);
router.delete("/:slug", authenticateToken, SummaryReportController.destroy);

export default router;
