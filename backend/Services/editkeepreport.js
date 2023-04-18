const db = require('../config/dbConfig')
const request = require('request')

const updatequartercharges = (req, res) => {
    const ID = req.params.id;
    const proid = req.body.project_id;
    const used = req.body.used;
    const periodcheck = req.body.period_check;
    const status = req.body.status_report;
    db.query(
        "UPDATE tbl_report SET project_id = ?, used = ?, period_check = ?, status_report = ? WHERE report_id = ?",
        [proid, used, periodcheck, status, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('used', ID)
    console.log('newproject', proid)
    console.log('newused', used)
    console.log('newperiodchck', periodcheck)
    console.log('newstatus', status)
}

const updatereportone = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status_report1;
    db.query(
        "UPDATE tbl_project SET status_report1 = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportone', ID)
    console.log('newstatus', status)
}

const updatedetail = (req, res) => {
    const ID = req.params.id;
    const detail = req.body.detail;
    const status = req.body.status_detail;
    db.query(
        "UPDATE tbl_detail SET detail = ?, status_detail = ? WHERE detail_id = ?",
        [detail, status, ID],
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
    console.log('newstatus', status)
}

const updateproblem = (req, res) => {
    const ID = req.params.id;
    const problem = req.body.problem;
    const status = req.body.status_problem;
    db.query(
        "UPDATE tbl_problem SET problem = ?, status_problem = ? WHERE problem_id = ?",
        [problem, status, ID],
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
    console.log('newstatus', status)
}

const updatereporttwo = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status_report2;
    db.query(
        "UPDATE tbl_project SET status_report2 = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reporttwo', ID)
    console.log('newstatus', status)
}

const updatereportthree = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status_report3;
    db.query(
        "UPDATE tbl_project SET status_report3 = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportthree', ID)
    console.log('newstatus', status)
}

const updatereportfour = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status_report4;
    db.query(
        "UPDATE tbl_project SET status_report4 = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportfour', ID)
    console.log('newstatus', status)
}

module.exports = { updatequartercharges, updatereportone, updatedetail, updateproblem, updatereporttwo, updatereportthree, updatereportfour }