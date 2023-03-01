const Pdf = require("../models/pdf")

exports.savePdf = (req, res, next) => {
	console.log(req.file.filename)
  const url = req.protocol + "://" + req.get("host")

	pdf = new Pdf({
		name: req.file.filename,
    pdfPath: url + "/pdfs/" + req.file.filename
	})

	pdf.save()
		.then(result => {
			res.status(200).json({
        message: "Pdf saved."
      })
		})
}

exports.getPdfs = (req, res, next) => {

	Pdf.find({})
		.then(result => {
			res.status(200).json({
				message: "Pdf's retrieved",
        fetchedPdf: result
			})
		})
    .catch(error => {
      res.status(404).json({
        message: "Couldn't find any pdf's."
      })
    })
}

exports.getPdf = (req, res, next) => {

  Pdf.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        message: "Pdf retrieved",
        fetchedPdf: result
      })
    })
}
