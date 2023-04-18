const db = require('../config/dbConfig')
const request = require('request')

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public_html/', 'uploads'),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const torfile = (req, res) => {
  const file = req.body.userInfo.filepreview;
  const id = req.body.project_id
  db.query("INSERT INTO tbl_tor (project_id, file) VALUES (?,?)",
    [id, file], (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    })
}

const getpdf = (req, res) => {
  const id = req.params.id
  db.query("SELECT file FROM tbl_tor WHERE project_id = ? ",
    [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
        //   Object.keys(result).forEach(function (key) {
        //       var row = result[key]
        //       console.log(row);
        //       res.send(row)
        //   })
      }
    })
}

const openpdf = (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_tor LEFT JOIN tbl_project ON tbl_tor.project_id = tbl_project.project_id WHERE tbl_tor.project_id = ? ",
    [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
        //   Object.keys(result).forEach(function (key) {
        //       var row = result[key]
        //       console.log(row);
        //       res.send(row)
        //   })
      }
    })
}

const evaluationfile = (req, res) => {
  const file = req.body.userInfo.filepreview;
  const id = req.body.project_id
  db.query("INSERT INTO tbl_evaluationfile (project_id, file) VALUES (?,?)",
    [id, file], (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    })
}

const getevaluationfile = (req, res) => {
  const id = req.params.id
  db.query("SELECT file FROM tbl_evaluationfile WHERE project_id = ? ",
    [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
        //   Object.keys(result).forEach(function (key) {
        //       var row = result[key]
        //       console.log(row);
        //       res.send(row)
        //   })
      }
    })
}

module.exports = { torfile, getpdf, openpdf, evaluationfile, getevaluationfile }