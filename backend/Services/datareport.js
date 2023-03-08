const db = require('../config/dbConfig')
const request = require('request')

const quarterchargesone = (req, res) => {
    const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const indicreportone = (req, res) => {
    const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_one AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const detailreportone = (req, res) => {
    const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const problemreportone = (req, res) => {
    const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const quarterchargestwo = (req, res) => {
    const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const indicreporttwo = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_two AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const detailreporttwo = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const problemreporttwo = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const quarterchargesthree = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const indicreportthree = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_three AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const detailreportthree = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const problemreportthree = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const quarterchargesfour = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const indicreportfour = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_four AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const detailreportfour = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

const problemreportfour = (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
}

module.exports = { quarterchargesone, indicreportone, detailreportone, problemreportone, quarterchargestwo, indicreporttwo, detailreporttwo, problemreporttwo, quarterchargesthree, indicreportthree, detailreportthree, problemreportthree, quarterchargesfour, indicreportfour, detailreportfour, problemreportfour }