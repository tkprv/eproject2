const db = require('../config/dbConfig')
const request = require('request')

const showeditreport = (req, res) => {
    const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_report WHERE report_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updatequartercharges = (req, res) => {
    const ID = req.params.id;
  const used = req.body.used;
  const periodcheck = req.body.period_check
  db.query(
    "UPDATE tbl_report SET used = ?, period_check = ? WHERE report_id = ?",
    [used, periodcheck, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('used', ID)
  console.log('newused', used)
  console.log('newperiodchck', periodcheck)
}

const showdetail = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_detail WHERE detail_id =?", [ID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}

const updatedetail = (req, res) => {
    const ID = req.params.id;
  const detail = req.body.detail;
  db.query(
    "UPDATE tbl_detail SET detail = ? WHERE detail_id = ?",
    [detail, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('detail', ID)
  console.log('newdetail', detail)
}

const showproblem = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_problem WHERE problem_id = ?", [ID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}

const updateproblem = (req, res) => {
    const ID = req.params.id;
  const problem = req.body.problem;
  db.query(
    "UPDATE tbl_problem SET problem = ? WHERE problem_id = ?",
    [problem, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('problem', ID)
  console.log('newproblem', problem)
}

module.exports = { showeditreport, updatequartercharges, showdetail, updatedetail, showproblem, updateproblem }