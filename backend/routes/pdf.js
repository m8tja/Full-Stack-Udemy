const express = require("express")
const router = express.Router()
const extractFile = require("../middleware/file-pdf")
const PdfController = require("../controllers/pdf")

router.post("", extractFile, PdfController.savePdf)
router.get("", PdfController.getPdfs)
router.get("/:id", PdfController.getPdf)

module.exports = router
