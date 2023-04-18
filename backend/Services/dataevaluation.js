const db = require('../config/dbConfig')
const request = require('request')

const showobjective = (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_objective WHERE objective_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updateobjective = (req, res) => {
  const ID = req.params.id;
  const obtain = req.body.obtain;
  db.query(
    "UPDATE tbl_objective SET obtain = ? WHERE objective_id = ?",
    [obtain, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('obtain', ID)
  console.log('newobtain', obtain)
}

const addprojectevaluation = (req, res) => {
  const project = req.body.project_id
  const explanation = req.body.explanation
  const result = req.body.result
  const motive = req.body.motive
  const conducting = req.body.conducting
  const realused = req.body.real_used
  const benefit = req.body.benefit
  const problem = req.body.problem
  const improvement = req.body.improvement
  const datetime = req.body.date_time_project
  console.log('estimate', req.body)
  db.query("INSERT INTO tbl_estimate (project_id, explanation, result, motive, conducting, real_used, benefit, problem, improvement, date_time_project) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [project, explanation, result, motive, conducting, realused, benefit, problem, improvement, datetime],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    })
}

const estimateproject = (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_estimate LEFT JOIN tbl_project ON tbl_project.project_id = tbl_estimate.project_id WHERE tbl_estimate.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log('11', err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
}

const updatestatus = (req, res) => {
  const ID = req.params.id;
  const status = req.body.status_evaluation;
  db.query(
    "UPDATE tbl_project SET status_evaluation = ? WHERE project_id = ?",
    [status, ID],
    (err, result) => {
      if (err) {
        console.log('11', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('status', ID)
  console.log('newstatus', status)
}

const editprojectevaluation = (req, res) => {
  const id = req.params.id
  const explanation = req.body.explanation
  const result = req.body.result
  const motive = req.body.motive
  const conducting = req.body.conducting
  const realused = req.body.real_used
  const benefit = req.body.benefit
  const problem = req.body.problem
  const improvement = req.body.improvement
  const datetime = req.body.date_time_project
  console.log('estimate', req.body)
  db.query("UPDATE tbl_estimate SET explanation = ?, result = ?, motive = ?, conducting = ?, real_used = ?, benefit = ?, problem = ?, improvement = ?, date_time_project = ? WHERE project_id = ?",
    [explanation, result, motive, conducting, realused, benefit, problem, improvement, datetime, id],
    (err, result) => {
      if (err) {
        console.log('11', err)
      } else {
        res.send(result)
      }
    }
  )
}

module.exports = { showobjective, updateobjective, addprojectevaluation, estimateproject, updatestatus, editprojectevaluation }