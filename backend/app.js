const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")
const pdfRoutes = require("./routes/pdf")

const app = express()
app.use(bodyParser.json())
app.use("/images", express.static(path.join("backend/images")))

mongoose.connect("mongodb+srv://matejacerina:" + process.env.MONGO_ATLAS_PW + "@full-stack-helsinki.sbkiiss.mongodb.net/postsApp?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed.")
  })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  next()
})

app.use("/api/posts", postsRoutes)
app.use("/api/user", userRoutes)
app.use("/api/pdf", pdfRoutes)

module.exports = app
