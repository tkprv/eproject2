const db = require('../config/dbConfig')
const request = require('request')

const statuspurchase = (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_statuspurchase WHERE project_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const addstatuspurchase = (req, res) => {
  const user = req.body.user_id
  const statuspurchase = req.body.statuspurchase;
  const time_statuspurchase = req.body.time_statuspurchase
  const date_statuspurchase = req.body.date_statuspurchase
  const project_id = req.body.project_id
  console.log('addstatuspurchase', req.body)
  db.query("INSERT INTO tbl_statuspurchase (user_id, statuspurchase, time_statuspurchase, date_statuspurchase, project_id) VALUES (?, ?, ?, ?, ?)",
    [user, statuspurchase, time_statuspurchase, date_statuspurchase, project_id],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
}

const updatestatuspurchase = (req, res) => {
  const ID = req.params.id;
  const user = req.body.user_id
  const statuspurchase = req.body.statuspurchase;
  const time = req.body.time_statuspurchase;
  const date = req.body.date_statuspurchase;
  console.log('statuspurchase', req.body)
  db.query(
    "UPDATE tbl_statuspurchase SET user_id = ?, statuspurchase = ?, time_statuspurchase = ?, date_statuspurchase = ?  WHERE statuspurchase_id = ?",
    [user, statuspurchase, time, date, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
}

const updatestatus = (req, res) => {
  const ID = req.params.id;
  const status = req.body.status_statuspurchase;
  db.query(
    "UPDATE tbl_project SET status_statuspurchase = ? WHERE project_id = ?",
    [status, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('id', ID)
  console.log('status', status)
}
module.exports = { statuspurchase, addstatuspurchase, updatestatuspurchase, updatestatus }