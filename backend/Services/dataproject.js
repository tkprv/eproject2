const db = require('../config/dbConfig')
const request = require('request')

const getproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_user_project.project_id = tbl_project.project_id WHERE tbl_project.status != 100 AND tbl_project.status = 4 AND tbl_project.status != 10 AND tbl_user_project.user_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}

const projectuser = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_user_project.project_id = tbl_project.project_id WHERE tbl_user_project.user_id = ? AND tbl_project.status != 100 AND tbl_project.status != 10",
    [ID], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
    console.log('id', ID)
}

const projectleader = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project WHERE section_id = ? AND status != 100 AND status != 10",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}

const projectdiector = (req, res) => {
    db.query("SELECT * FROM tbl_project WHERE (status = 3 OR status = 4 OR status = 5) AND status != 100 AND status != 10", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
}

const fiscalyear = (req, res) => {
    db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const project = (req, res) => {
    db.query("SELECT * FROM tbl_project WHERE status != 100 AND status != 10", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const sectionproject = (req, res) => {

    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_section WHERE section_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const userproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_user_project.user_project_id, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname FROM tbl_user_project LEFT JOIN tbl_project ON tbl_user_project.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_user_project.user_id = tbl_user.user_id WHERE tbl_user_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const strategicplanproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_strategic_project.strategic_project_id, tbl_project.project_id, tbl_strategic_project.project_id, tbl_fiscalyear.fiscalyear_id, tbl_fiscalyear.plan_name FROM tbl_strategic_project LEFT JOIN tbl_project ON tbl_strategic_project.project_id = tbl_project.project_id LEFT JOIN tbl_fiscalyear ON tbl_fiscalyear.fiscalyear_id = tbl_strategic_project.plan_id WHERE tbl_strategic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const strategicproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_strategic_project.strategic_project_id, tbl_project.project_id, tbl_strategic_project.project_id, tbl_strategic.strategic_id, tbl_strategic.strategic_name FROM tbl_strategic_project LEFT JOIN tbl_project ON tbl_strategic_project.project_id = tbl_project.project_id LEFT JOIN tbl_strategic ON tbl_strategic.strategic_id = tbl_strategic_project.strategic_id WHERE tbl_strategic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const goalproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_strategic_project.strategic_project_id, tbl_project.project_id, tbl_strategic_project.project_id, tbl_goal.goal_id, tbl_goal.goal_name FROM tbl_strategic_project LEFT JOIN tbl_project ON tbl_strategic_project.project_id = tbl_project.project_id LEFT JOIN tbl_goal ON tbl_goal.goal_id = tbl_strategic_project.goal_id WHERE tbl_strategic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const tacticproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_strategic_project.strategic_project_id, tbl_project.project_id, tbl_strategic_project.project_id, tbl_tactic.tactic_id, tbl_tactic.tactic_name FROM tbl_strategic_project LEFT JOIN tbl_project ON tbl_strategic_project.project_id = tbl_project.project_id LEFT JOIN tbl_tactic ON tbl_tactic.tactic_id = tbl_strategic_project.tactic_id WHERE tbl_strategic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const integrationproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_integration WHERE integration_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const objectiveproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_project.project_id, tbl_objective.objective_id, tbl_objective.objective_name FROM tbl_objective LEFT JOIN tbl_project ON tbl_project.project_id = tbl_objective.project_id WHERE tbl_objective.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const indicproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_indic_project.indic_project_id, tbl_indic_project.indic_project, tbl_indic_project.unit, tbl_indic_project.cost, tbl_project.project_id FROM tbl_indic_project LEFT JOIN tbl_project ON tbl_project.project_id = tbl_indic_project.project_id WHERE tbl_indic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const stepproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_step.step_id, tbl_step.step_name, tbl_step.start, tbl_step.stop, tbl_project.project_id FROM tbl_step LEFT JOIN tbl_project ON tbl_step.project_id = tbl_project.project_id WHERE tbl_step.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const workplanproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_workplan WHERE workplan_id = ?",
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

const chargesproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_charges.charges_id, tbl_charges.charges_name_head, tbl_charges.charges_name, tbl_charges.quarter_one, tbl_charges.quarter_two, tbl_charges.quarter_three, tbl_charges.quarter_four, tbl_project.project_id FROM tbl_charges LEFT JOIN tbl_project ON tbl_charges.project_id = tbl_project.project_id WHERE tbl_charges.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const benefitproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_benefit.benefit_id, tbl_benefit.benefit_name, tbl_project.project_id FROM tbl_benefit LEFT JOIN tbl_project ON tbl_benefit.project_id = tbl_project.project_id WHERE tbl_benefit.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const commentproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_comment.comment_id, tbl_comment.comment, tbl_comment.time_comment, tbl_comment.date_comment, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname, tbl_user.director, tbl_user.manager, tbl_user.supervisor, tbl_user.supplies, tbl_user.responsible, tbl_user.admin FROM tbl_comment LEFT JOIN tbl_project ON tbl_comment.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_comment.user_id = tbl_user.user_id WHERE tbl_comment.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const confirmproject = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
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

const noconfirmproject = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
}

const comment = (req, res) => {
    const project = req.body.project_id
    const user = req.body.user_id
    const comment = req.body.comment;
    const comment_level = req.body.comment_level
    const time_comment = req.body.time_comment
    const date_comment = req.body.date_comment
    const comment_type = req.body.comment_type
    console.log('comment', req.body)
    db.query("INSERT INTO tbl_comment (project_id, user_id, comment, comment_level, time_comment, date_comment, comment_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [project, user, comment, comment_level, time_comment, date_comment, comment_type],
        (err, result) => {
            if (err) {
                console.log('13', err)
            } else {
                res.send("Values Inserted")
            }
        })
}

const projecttor = (req, res) => {
    db.query("SELECT * FROM tbl_project WHERE tor = 1 AND status != 100 AND status != 10", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const deleteprojectid = (req, res) => {
    db.query("SELECT * FROM tbl_project", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const deleteproject = (req, res) => {
    const ID = req.params.ID;
    db.query("DELETE FROM tbl_project WHERE project_id = ?", ID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const showproject = (req, res) => {
    const ID = req.params.id;
    console.log('id', ID)
    db.query("SELECT * FROM tbl_project WHERE project_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const openreportone = (req, res) => {
    const ID = req.params.id;
    const openreportone = req.body.open_reportone;
    db.query(
        "UPDATE tbl_project SET open_reportone = ? WHERE project_id = ?",
        [openreportone, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportone', ID)
    console.log('newopenreportone', openreportone)
}

const openreporttwo = (req, res) => {
    const ID = req.params.id;
    const openreporttwo = req.body.open_reporttwo;
    db.query(
        "UPDATE tbl_project SET open_reporttwo = ? WHERE project_id = ?",
        [openreporttwo, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreporttwo', ID)
    console.log('newopenreporttwo', openreporttwo)
}

const openreportthree = (req, res) => {
    const ID = req.params.id;
    const openreportthree = req.body.open_reportthree;
    db.query(
        "UPDATE tbl_project SET open_reportthree = ? WHERE project_id = ?",
        [openreportthree, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportthree', ID)
    console.log('newopenreportthree', openreportthree)
}

const openreportfour = (req, res) => {
    const ID = req.params.id;
    const openreportfour = req.body.open_reportfour;
    db.query(
        "UPDATE tbl_project SET open_reportfour = ? WHERE project_id = ?",
        [openreportfour, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportfour', ID)
    console.log('newopenreportfour', openreportfour)
}

const closeproject = (req, res) => {
    const ID = req.params.id;
    const closeproject = req.body.close_project;
    db.query(
        "UPDATE tbl_project SET close_project = ? WHERE project_id = ?",
        [closeproject, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('closeproject', ID)
    console.log('newcloseproject', closeproject)
}

const findproject = (req, res) => {
    const year = req.params.year
    const status = req.params.status
    db.query("SELECT * FROM tbl_project   WHERE  status = ? and fiscalyear = ?",[status,year] , (err, result) => {
        if (err) {
            console.log(err);
        } else {
           res.send(result);
        }
    })
}

const findprojectyear = (req, res) => {
    const year = req.params.year
    console.log('hfhbvchcn');
    db.query("SELECT * FROM tbl_project  WHERE fiscalyear = ?",[year] , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(result);
           res.send(result);
        }
    })
}

const notproject = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
}

const notcomment = (req, res) => {
    const project = req.body.project_id
    const comment = req.body.comment;
    const user = req.body.user_id
    const time_comment = req.body.time_comment
    const date_comment = req.body.date_comment
    console.log('comment', req.body)
    db.query("INSERT INTO tbl_notproject (project_id, comment, user_id, time_comment, date_comment) VALUES (?, ?, ?, ?, ?)",
        [project, comment, user, time_comment, date_comment],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        })
}
const projectreport = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_user_project.project_id = tbl_project.project_id WHERE tbl_project.status != 100 AND tbl_project.status = 4 AND tbl_project.status != 10 AND (tbl_project.status_report1 = 0 OR tbl_project.status_report2 = 0 OR tbl_project.status_report3 = 0 OR tbl_project.status_report4 = 0) AND tbl_user_project.user_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}


const pro = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project WHERE project_id = ?",
    [ID], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
    console.log('id', ID)
}

module.exports = { getproject, projectleader,projectuser, projectdiector  ,fiscalyear, project, sectionproject, userproject, strategicplanproject, strategicproject, goalproject, tacticproject, integrationproject, objectiveproject, indicproject, stepproject, workplanproject, chargesproject, benefitproject, commentproject, confirmproject, noconfirmproject, comment, projecttor, deleteprojectid, deleteproject, showproject, openreportone, openreporttwo, openreportthree, openreportfour, closeproject, findproject, findprojectyear, notproject, notcomment, projectreport, pro }