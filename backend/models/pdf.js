const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const pdfSchema = mongoose.Schema({
	name: { type: String },
	pdfPath: { type: String }
})

module.exports = mongoose.model("Pdf", pdfSchema)
