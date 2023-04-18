const db = require('../config/dbConfig')
const request = require('request')

const createquartercharges = (req, res) => {
    const project = req.body.project_id;
    const quarter = req.body.quarter;
    const used = req.body.used;
    const periodcheck = req.body.period_check;
    const status = req.body.status_report;
    console.log('charges', req.body)
    db.query("INSERT INTO tbl_report (project_id, quarter, used, period_check, status_report) VALUES (?, ?, ?, ?, ?)",
        [project, quarter, used, periodcheck, status],
        (err, result) => {
            if (err) {
                console.log('13', err)
            } else {
                res.send(result)
            }
        })
}

const updatereportone = (req, res) => {
    const ID = req.params.id;
    const reportone = req.body.report_one;
    const status = req.body.status_report1;
    db.query(
        "UPDATE tbl_project SET report_one = ?, status_report1 = ? WHERE project_id = ?",
        [reportone, status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportone', ID)
    console.log('newreportone', reportone)
    console.log('newstatus', status)
}

const showreport = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_report LEFT JOIN tbl_project ON tbl_project.project_id = tbl_report.project_id  WHERE tbl_report.report_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('ID', ID)
}

const createdetail = (req, res) => {
    const report = req.body.report_id
    const detail = req.body.detail
    console.log('detail', req.body)
    db.query("INSERT INTO tbl_detail (report_id, detail) VALUES (?, ?)",
        [report, detail],
        (err, result) => {
            if (err) {
                console.log('13', err)
            } else {
                res.send("Values Inserted")
            }
        })
}

const createproblem = (req, res) => {
    const report = req.body.report_id
    const problem = req.body.problem
    console.log('problem', req.body)
    db.query("INSERT INTO tbl_problem (report_id, problem) VALUES (?, ?)",
        [report, problem],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        })
}

const showresult = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_indic_project_result WHERE indic_project_result_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const createresult = (req, res) => {
    const ID = req.params.id;
    const result = req.body.result;
    const achieve = req.body.achieve;
    db.query(
        "UPDATE tbl_indic_project_result SET result = ?, achieve = ? WHERE indic_project_result_id = ?",
        [result, achieve, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('result', ID)
    console.log('newresult', result)
    console.log('achieve', ID)
    console.log('newachieve', achieve)
}

const updatereporttwo = (req, res) => {
    const ID = req.params.id;
    const reporttwo = req.body.report_two;
    const status = req.body.status_report2;
    db.query(
        "UPDATE tbl_project SET report_two = ?, status_report2 = ? WHERE project_id = ?",
        [reporttwo, status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reporttwo', ID)
    console.log('newreporttwo', reporttwo)
    console.log('newstatus', status)
}

const updatereportthree = (req, res) => {
    const ID = req.params.id;
    const reportthree = req.body.report_three;
    const status = req.body.status_report3;
    db.query(
        "UPDATE tbl_project SET report_three = ?, status_report3 = ? WHERE project_id = ?",
        [reportthree, status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportthree', ID)
    console.log('newreportthree', reportthree)
    console.log('newstatus', status)
}

const updatereportfour = (req, res) => {
    const ID = req.params.id;
    const reportfour = req.body.report_four;
    const status = req.body.status_report4;
    db.query(
        "UPDATE tbl_project SET report_four = ?, status_report4 = ? WHERE project_id = ?",
        [reportfour, status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('reportfour', ID)
    console.log('newreportfour', reportfour)
    console.log('newstatus', status)
}

module.exports = { createquartercharges, updatereportone, showreport, createdetail, createproblem, showresult, createresult, updatereporttwo, updatereportthree, updatereportfour }