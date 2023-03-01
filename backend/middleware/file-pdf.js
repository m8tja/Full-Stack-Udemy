const multer = require("multer")

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'backend/pdfs')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + ".pdf")
	}
 });

module.exports = multer({storage: storage}).single("pdf")
